// API utilities for blockchain backend communication

const API_BASE_URL = 'http://localhost:8000'; // Adjust based on your Python backend

export interface Block {
  index: number;
  timestamp: number;
  data: string[];
  prev_hash: string;
  hash: string;
  nonce: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class BlockchainAPI {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`API request failed:`, error);
      const isConnectionError = error instanceof Error && error.message === 'Failed to fetch';
      return { 
        success: false, 
        message: isConnectionError 
          ? 'Cannot connect to blockchain server. Please start the Python backend (crypto.py) on port 8000.'
          : (error instanceof Error ? error.message : 'Unknown error')
      };
    }
  }

  async setDifficulty(difficulty: number): Promise<ApiResponse<any>> {
    return this.request('/set_difficulty', {
      method: 'POST',
      body: JSON.stringify({ difficulty }),
    });
  }

  async addTransaction(transaction: string): Promise<ApiResponse<any>> {
    return this.request('/add_transaction', {
      method: 'POST',
      body: JSON.stringify({ transaction }),
    });
  }

  async viewChain(): Promise<ApiResponse<Block[]>> {
    return this.request<Block[]>('/view_chain');
  }

  async tamperBlock(index: number, newData: string): Promise<ApiResponse<any>> {
    return this.request('/tamper_block', {
      method: 'POST',
      body: JSON.stringify({ index, new_data: newData }),
    });
  }

  async verifyChain(): Promise<ApiResponse<boolean>> {
    const result = await this.request<{ valid: boolean }>('/verify_chain');
    if (result.success && result.data) {
      return { success: true, data: result.data.valid };
    }
    return { success: false, message: result.message };
  }
}

export const api = new BlockchainAPI();