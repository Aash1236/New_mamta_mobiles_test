export const registerScenarios = [
  // --- Positive Scenario ---
  {
    id: 'TC_REG_001',
    description: 'Valid Registration (Standard)',
    name: 'Auto User',
    email: `auto_${Date.now()}@test.com`,
    password: 'SecurePass123!',
    shouldPass: true,
    expectedError: ''
  },
  {
    id: 'TC_REG_009',
    description: 'Leading/Trailing Spaces (Should Trim)',
    name: 'Space User',
    email: '  spaceuser@test.com  ', 
    password: 'Pass123!',
    shouldPass: true,
    expectedError: ''
  },
  {
    id: 'TC_REG_010',
    description: 'Long Name (50+ Chars)',
    name: 'ThisIsAVeryLongNameThatShouldNotBreakTheLayoutAndRegisterSuccessfully',
    email: `longname_${Date.now()}@test.com`,
    password: 'Pass123!',
    shouldPass: true,
    expectedError: ''
  },
  {
    id: 'TC_REG_011',
    description: 'Special Char/Script in Name (Security)',
    name: '<script>alert("test")</script>',
    email: `script_${Date.now()}@test.com`,
    password: 'Pass123!',
    shouldPass: true,
    expectedError: ''
  },

  // --- Negative Scenarios ---
  {
    id: 'TC_REG_002',
    description: 'Duplicate Email',
    name: 'Duplicate User',
    email: 'ashutoshfase1028@gmail.com', // Already registered
    password: 'Test@123',
    shouldPass: false,
    expectedError: 'User already exists'
  },
  {
    id: 'TC_REG_003',
    description: 'Email Missing @ (HTML5 Validation)',
    name: 'Invalid User',
    email: 'invalidemail.com',
    password: 'Pass123',
    shouldPass: false,
    expectedError: '', // HTML5 check doesn't use a text div
    isHtml5Check: true // Special flag for the test script
  },
  {
    id: 'TC_REG_006',
    description: 'Empty Name',
    name: '',
    email: 'valid@test.com',
    password: 'Pass123',
    shouldPass: false,
    expectedError: 'Full Name is required'
  },
  {
    id: 'TC_REG_007',
    description: 'Empty Email',
    name: 'Test User',
    email: '',
    password: 'Pass123',
    shouldPass: false,
    expectedError: 'Email is required'
  },
  {
    id: 'TC_REG_008',
    description: 'Empty Password',
    name: 'Test User',
    email: 'valid@test.com',
    password: '',
    shouldPass: false,
    expectedError: 'Password is required'
  },

  // --- BUGGY SCENARIOS (Commented out) ---
  /*
  {
    id: 'TC_REG_004',
    description: 'Invalid Email Format (Bug: Accepted)',
    name: 'Bug User',
    email: 'testuser@gmail', // Missing domain
    password: 'Pass123',
    shouldPass: false,
    expectedError: 'Invalid email format'
  },
  {
    id: 'TC_REG_005',
    description: 'Short Password (Bug: Accepted)',
    name: 'Bug User',
    email: 'valid@test.com',
    password: '123',
    shouldPass: false,
    expectedError: 'Password must be at least 6 characters'
  }
  */
];