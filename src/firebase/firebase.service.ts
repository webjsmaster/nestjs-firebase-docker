import { Injectable } from '@nestjs/common';
import {
  Database,
  get,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import app from './firebase.config';
import { reduce } from 'rxjs';

@Injectable()
export class FirebaseService {
  private db: Database;

  constructor() {
    this.db = getDatabase(app);
  }

  async writeDataBase(path: string, data: any): Promise<void> {
    const reference = ref(this.db, path);
    await set(reference, data);
  }

  async readDataBase(): Promise<any> {
    let data;
    const reference = await ref(this.db, 'comments');
    const test = await onValue(reference, (snapshot) => {
      data = snapshot.val();
    });

    return data;
  }
}
