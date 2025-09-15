import hashlib
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class Block:
    def __init__(self, index, timestamp, data, prev_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data   # list of transactions
        self.prev_hash = prev_hash
        self.nonce = 0
        self.hash = self.compute_hash()

    def compute_hash(self):
        block_string = f"{self.index}{self.timestamp}{self.data}{self.prev_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, difficulty):
        target = "0" * difficulty
        while not self.hash.startswith(target):
            self.nonce += 1
            self.hash = self.compute_hash()
        print(f"✅ Block {self.index} mined with nonce {self.nonce}: {self.hash}")

    def to_dict(self):
        return {
            'index': self.index,
            'timestamp': self.timestamp,
            'data': self.data,
            'prev_hash': self.prev_hash,
            'hash': self.hash,
            'nonce': self.nonce
        }


class Blockchain:
    def __init__(self, difficulty=3):
        self.chain = [self.create_genesis_block()]
        self.difficulty = difficulty

    def create_genesis_block(self):
        return Block(0, time.time(), ["Genesis Block"], "0")

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, new_block):
        new_block.prev_hash = self.get_latest_block().hash
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            prev = self.chain[i-1]
            if current.hash != current.compute_hash():
                return False
            if current.prev_hash != prev.hash:
                return False
        return True

    def tamper_block(self, index, new_data):
        if index < len(self.chain):
            self.chain[index].data = [new_data]  # Ensure data is a list
            self.chain[index].hash = self.chain[index].compute_hash()
            print(f"⚠ Block {index} tampered! New hash: {self.chain[index].hash}")

    def set_difficulty(self, new_difficulty):
        self.difficulty = new_difficulty
        print(f"⚙️ Mining difficulty set to {new_difficulty}")


# Global blockchain instance
blockchain = Blockchain(difficulty=3)

# API Routes
@app.route('/set_difficulty', methods=['POST'])
def set_difficulty():
    try:
        data = request.get_json()
        difficulty = data.get('difficulty')
        
        if difficulty is None or not isinstance(difficulty, int) or difficulty < 1:
            return jsonify({'error': 'Invalid difficulty. Must be a positive integer.'}), 400
        
        blockchain.set_difficulty(difficulty)
        return jsonify({'message': f'Difficulty set to {difficulty}', 'difficulty': difficulty})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    try:
        data = request.get_json()
        transaction = data.get('transaction')
        
        if not transaction:
            return jsonify({'error': 'Transaction is required'}), 400
        
        # Create new block with the transaction
        new_block = Block(
            len(blockchain.chain), 
            time.time(), 
            [transaction], 
            blockchain.get_latest_block().hash
        )
        
        blockchain.add_block(new_block)
        
        return jsonify({
            'message': 'Transaction added successfully',
            'block': new_block.to_dict()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/view_chain', methods=['GET'])
def view_chain():
    try:
        chain_data = [block.to_dict() for block in blockchain.chain]
        return jsonify(chain_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/tamper_block', methods=['POST'])
def tamper_block():
    try:
        data = request.get_json()
        index = data.get('index')
        new_data = data.get('new_data')
        
        if index is None or not isinstance(index, int) or index < 0:
            return jsonify({'error': 'Invalid block index'}), 400
        
        if not new_data:
            return jsonify({'error': 'New data is required'}), 400
        
        if index >= len(blockchain.chain):
            return jsonify({'error': 'Block index out of range'}), 400
        
        blockchain.tamper_block(index, new_data)
        
        return jsonify({
            'message': f'Block {index} tampered successfully',
            'block': blockchain.chain[index].to_dict()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/verify_chain', methods=['GET'])
def verify_chain():
    try:
        is_valid = blockchain.is_chain_valid()
        return jsonify({'valid': is_valid})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'blockchain_length': len(blockchain.chain),
        'difficulty': blockchain.difficulty
    })


if __name__ == "__main__":
    print("🚀 Starting CryptoChain Blockchain Server...")
    print("📡 Server will run on http://localhost:8000")
    print("🔗 Frontend should connect to this URL")
    print("\n💡 Available endpoints:")
    print("  POST /set_difficulty - Set mining difficulty")
    print("  POST /add_transaction - Add new transaction")
    print("  GET  /view_chain - View entire blockchain")
    print("  POST /tamper_block - Tamper with a block")
    print("  GET  /verify_chain - Verify blockchain integrity")
    print("  GET  /health - Health check")
    print("\n⚙️  Starting with difficulty = 3")
    print("📦 Genesis block created automatically")
    print("\n" + "="*50)
    
    app.run(host='0.0.0.0', port=8000, debug=True)