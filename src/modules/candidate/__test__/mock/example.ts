import { AppRole } from '../../../../common';

import { IPaginationParams } from '../../../../common/pagination';
import { response } from '../../../../common/response';

export const getCandidateListResponseExample = response.success({
  items: [
    {
      id: '62d91171ff8412cec0e24abb',
      name: 'ducimus quam voluptatem',
      email: 'Emmie.Marks75'
    },
    {
      id: '62d91171ff8412cec0e24abc',
      name: 'vero maxime voluptatem',
      email: 'Cloyd.Schneider20'
    },
    {
      id: '62d91171ff8412cec0e24abd',
      name: 'adipisci qui accusantium',
      email: 'Judah81'
    },
    {
      id: '62d91171ff8412cec0e24abe',
      name: 'et molestiae non',
      email: 'Lukas.Casper'
    },
    {
      id: '62d91171ff8412cec0e24abf',
      name: 'dolorem praesentium animi',
      email: 'Nella.Crona'
    },
    {
      id: '62d91171ff8412cec0e24ac0',
      name: 'aut voluptate praesentium',
      email: 'Ricky_Hessel6'
    }
  ]
});

export const paginationParams: IPaginationParams = {
  limit: 10,
  offset: 0,
  page: 1,
  sortType: 1,
  sortField: 'name'
};

export const EmployeeModelExample = {
  email: 'test@gmail.com',
  companyId: '62d91401ba53b796a6dc46ca',
  role: AppRole.Employee,
  departmentId: 'testDepartmentId',
  positionId: 'testPositionId'
};

export const employeeJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkVtcGxveWVlIiwiaWF0IjoxNzIyMjM4MDk5fQ.GnIpr1EfU6a_qt1kEqBuzAuAbi6pRVXawYWjW841Rzk';

export const getListCandidateTest = {
  items: [
    {
      id: '62d91171ff8412cec0e24abb',
      name: 'ducimus quam voluptatem',
      email: 'Emmie.Marks75'
    },
    {
      id: '62d91171ff8412cec0e24abc',
      name: 'vero maxime voluptatem',
      email: 'Cloyd.Schneider20'
    },
    {
      id: '62d91171ff8412cec0e24abd',
      name: 'adipisci qui accusantium',
      email: 'Judah81'
    },
    {
      id: '62d91171ff8412cec0e24abe',
      name: 'et molestiae non',
      email: 'Lukas.Casper'
    },
    {
      id: '62d91171ff8412cec0e24abf',
      name: 'dolorem praesentium animi',
      email: 'Nella.Crona'
    },
    {
      id: '62d91171ff8412cec0e24ac0',
      name: 'aut voluptate praesentium',
      email: 'Ricky_Hessel6'
    }
  ],
  pagination: {
    totalItems: 6,
    page: 1,
    totalPages: 1,
    limit: 10
  }
};
