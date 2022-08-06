import { getListCandidateTest, paginationParams } from './mock/example';
import * as CandidateService from '../../candidate/candidate.service';

const mockGetAllFunction = jest.fn();
const mockGetListFunction = jest.fn();
const mockCountByParameterFunction = jest.fn();

jest.mock('../candidate.repository.ts', () => ({
  getAll: () => mockGetAllFunction(),
  getList: () => mockGetListFunction(),
  countByParameter: () => mockCountByParameterFunction()
}));

describe('user.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    expect.hasAssertions();
  });

  afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
  });

  describe('#Get Candidate list', () => {
    it('should get list cadidate success', async () => {
      mockGetAllFunction.mockResolvedValueOnce(getListCandidateTest.items);
      const result = await CandidateService.getAllCandidates();
      expect(result).toEqual(getListCandidateTest.items);
    });

    it('should get list of candidates by filter and pagination successfully', async () => {
      const mockTotalItems = 6;

      jest
        .spyOn(CandidateService, 'getPaginationParams')
        .mockReturnValueOnce(paginationParams);
      jest.spyOn(CandidateService, 'setFilterList').mockReturnValueOnce({});
      mockGetListFunction.mockResolvedValueOnce(getListCandidateTest.items);
      mockCountByParameterFunction.mockResolvedValueOnce(mockTotalItems);

      const expectedResult = {
        items: getListCandidateTest.items,
        pagination: {
          totalItems: mockTotalItems,
          page: getListCandidateTest.pagination.page,
          totalPages: Math.ceil(
            Number(mockTotalItems) / getListCandidateTest.pagination.limit
          ),
          limit: getListCandidateTest.pagination.limit
        }
      };

      const result = await CandidateService.getList(paginationParams);
      expect(mockGetListFunction).toHaveBeenCalled();
      expect(mockCountByParameterFunction).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
