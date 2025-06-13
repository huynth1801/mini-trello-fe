export interface ISendCodeResponse {
  success: boolean;
  message: string;
}

export interface ISignInResponse {
  accessToken: string;
}

export interface ICard {
  id: string;
  name: string;
  description: string;
  position: number;
}

export interface IBoard {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  color: string;
  userIds: string[];
  cards: ICard[];
}
