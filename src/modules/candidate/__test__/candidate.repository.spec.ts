import { CandidateModel } from '../candidate.model';
import { paginationParams, getListCandidateTest } from './mock/example';
import * as CandidateRepository from '../candidate.repository';
import { candidateListMock } from '../../mock-data/mocks/candidate';

describe('candidate.repository', () => {
  afterEach(async () => {
    expect.hasAssertions();
    jest.clearAllMocks();
  });

  describe('#getAll', () => {
    it('should get All candidate', async () => {
      jest.spyOn(CandidateModel, 'find').mockResolvedValue(candidateListMock);
      const response = await CandidateRepository.getAll();
      expect(response).toHaveLength(candidateListMock.length);
    });
  });

  describe('#getList', () => {
    it('should get list candidate with pagination', async () => {
      CandidateModel.find = jest.fn().mockImplementationOnce(() => ({
        limit: jest.fn().mockImplementationOnce(() => ({
          skip: jest.fn().mockImplementationOnce(() => ({
            sort: jest.fn().mockImplementationOnce(() => ({
              exec: jest.fn().mockResolvedValue(getListCandidateTest.items)
            }))
          }))
        }))
      }));
      const filter = {};
      const response = await CandidateRepository.getList(
        filter,
        paginationParams
      );
      expect(response).toHaveLength(getListCandidateTest.items.length);
    });
  });

  describe('#Count By Parameter', () => {
    it('should count By Parameter', async () => {
      const want = 10;
      CandidateModel.count = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(want)
      }));
      const filter = {};
      const response = await CandidateRepository.countByParameter(filter);
      expect(response).toEqual(want);
    });
  });
});
