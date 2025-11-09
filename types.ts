export interface User {
  email: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  sex: 'Male' | 'Female';
  picture?: string; // base64 string
}

export enum ActivityType {
  Food = 'Food',
  Walk = 'Walk',
  Play = 'Play',
  Sleep = 'Sleep',
  Vet = 'Vet Visit',
  Grooming = 'Grooming',
  Training = 'Training',
  Other = 'Other'
}

export interface Activity {
  id: string;
  dogId: string;
  timestamp: string;
  type: ActivityType;
  description: string;
  photo?: string; // base64 string
}
