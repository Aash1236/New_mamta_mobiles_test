export const searchScenarios = {
  validSearch: {
    testName: 'TC_SEARCH_001',
    query: 'Samsung',
    expectedText: 'Samsung'
  },
  partialSearch: {
    testName: 'TC_SEARCH_002',
    query: 'Galax',
    expectedText: 'Galaxy'
  },
  noResults: {
    testName: 'TC_SEARCH_003',
    query: 'XyzAbc123',
    expectedMessage: 'No products found'
  },
  caseInsensitive: {
    testName: 'TC_SEARCH_004',
    query: 'iphone',
    expectedText: 'iPhone'
  },
  emptySearch: {
    testName: 'TC_SEARCH_005',
    query: ''
  }
};