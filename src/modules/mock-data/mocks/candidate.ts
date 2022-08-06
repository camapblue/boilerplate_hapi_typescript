import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { Candidate } from "../../candidate/candidate.interface";

const candidateListMock: Candidate[] = [];

let i = 0;
while (i < 50) {
  candidateListMock.push({
    id: new ObjectId().toString(),
    name: faker.lorem.words(),
    email: faker.internet.email(),
    createdAt: faker.date.recent(),
  });

  i++;
}

export { candidateListMock };
