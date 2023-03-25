export type IStatus = 'Pending' | 'Confirmed' | 'Delivered' | 'Cancled' | null;

export interface ISearch {
  status?: IStatus;
}
