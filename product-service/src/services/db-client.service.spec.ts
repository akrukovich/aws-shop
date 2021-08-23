import { Client } from 'pg';
import DataBaseClient from './db-client.service';

describe('DataBaseClient', () => {
  it('should ', () => {
    expect(DataBaseClient.getClient()).toBeInstanceOf(Client);
  });
});
