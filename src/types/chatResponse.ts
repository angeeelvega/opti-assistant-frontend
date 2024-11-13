export interface ChatResponse {
  result?: string;
  source_documents?: any[];
}

export interface SendMessageParams {
  message: string;
  user_id: string;
}
