import Cryptr from 'cryptr';
import { AddAttendantArgs } from '../TypeGraphql/Attendant';

export const cryptr = new Cryptr(process.env.SECRET_KEY || '');
export class AttendantHelper {
  sortAttendants = (items: AddAttendantArgs[]): AddAttendantArgs[] => {
    if (items.length <= 1) {
      return items;
    }
    const mid = Math.floor(items.length / 2);

    const left = this.sortAttendants(items.slice(0, mid));

    const right = this.sortAttendants(items.slice(mid));

    return this.mergeAttendants(left, right);
  };

  private mergeAttendants = (
    left: AddAttendantArgs[],
    right: AddAttendantArgs[],
  ) => {
    const sort: AddAttendantArgs[] = [];

    while (left.length && right.length) {
      if (left[0].names < right[0].names) {
        sort.push(left.shift() as AddAttendantArgs);
      } else {
        sort.push(right.shift() as AddAttendantArgs);
      }
    }

    return [...sort, ...left, ...right];
  };

  findDuplicateEmail = (values: AddAttendantArgs[]) => {
    let duplicate: AddAttendantArgs[] = [];

    let items: AddAttendantArgs[] = [];

    for (let i = 0; i < values.length; i++) {
      if (items.length <= 0) {
        items.push(values[i]);
      } else {
        const find = items.filter((item) => item.email === values[i].email);

        if (find.length > 0) {
          duplicate = [...duplicate, ...find];
        } else {
          items.push(values[i]);
        }
      }
    }

    return duplicate.length > 0
      ? duplicate.map((item) => item.email).join(',')
      : undefined;
  };

  generateUniqueTestUri = (testId: string, attendantId: string) => {
    const encryptTestId = cryptr.encrypt(testId);

    const encryptAttendantId = cryptr.encrypt(attendantId);

    return `http://localhost:3000/todo/?test=${encryptTestId}&attendant=${encryptAttendantId}`;
  };
}
