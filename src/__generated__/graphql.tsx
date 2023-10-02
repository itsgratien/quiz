import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddAttendantArgs = {
  email: Scalars['String']['input'];
  names: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type AddAttendantResponse = {
  __typename?: 'AddAttendantResponse';
  data?: Maybe<Attendant>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type AddMoreAttendantResponse = {
  __typename?: 'AddMoreAttendantResponse';
  data?: Maybe<Attendant>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  items?: Maybe<Array<Attendant>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type AddQuestionResponse = {
  __typename?: 'AddQuestionResponse';
  data?: Maybe<Question>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type AddQuestionToTestResponse = {
  __typename?: 'AddQuestionToTestResponse';
  data?: Maybe<Question>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type AddTestResponse = {
  __typename?: 'AddTestResponse';
  data?: Maybe<Test>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type Answer = {
  __typename?: 'Answer';
  _id: Scalars['String']['output'];
  answers: Array<Scalars['String']['output']>;
  attendant: Attendant;
  attendantId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  grade: Scalars['String']['output'];
  question: Question;
  questionId?: Maybe<Scalars['String']['output']>;
  test: Test;
  testId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

export type AnswerResponse = {
  __typename?: 'AnswerResponse';
  data?: Maybe<Answer>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type AnsweredQuestions = {
  __typename?: 'AnsweredQuestions';
  answer: Answer;
};

export type Attendant = {
  __typename?: 'Attendant';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  names: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  test?: Maybe<AttendantRefTest>;
  testId?: Maybe<Scalars['String']['output']>;
  testUri?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AttendantRefTest = {
  __typename?: 'AttendantRefTest';
  _id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AuthenticateResponse = {
  __typename?: 'AuthenticateResponse';
  message: Scalars['String']['output'];
};

export type ErrorsT = {
  __typename?: 'ErrorsT';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type GetAnswerResponse = {
  __typename?: 'GetAnswerResponse';
  data?: Maybe<Answer>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetAttendantByTestResponse = {
  __typename?: 'GetAttendantByTestResponse';
  completedDoc?: Maybe<Scalars['Float']['output']>;
  data?: Maybe<Attendant>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  inProgressDoc?: Maybe<Scalars['Float']['output']>;
  items: Array<Attendant>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  startedDoc?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetMyTestResponse = {
  __typename?: 'GetMyTestResponse';
  data?: Maybe<Test>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  items?: Maybe<Array<Test>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetOverralGradeResponse = {
  __typename?: 'GetOverralGradeResponse';
  data?: Maybe<Result>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  overralgrade?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetQuestionAssignedToTestResponse = {
  __typename?: 'GetQuestionAssignedToTestResponse';
  data?: Maybe<Question>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  items: Array<Question>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  testId?: Maybe<Scalars['String']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetQuestionResponse = {
  __typename?: 'GetQuestionResponse';
  data?: Maybe<Question>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetQuestionsResponse = {
  __typename?: 'GetQuestionsResponse';
  data?: Maybe<Question>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  items?: Maybe<Array<Question>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetSingleTestResponse = {
  __typename?: 'GetSingleTestResponse';
  data?: Maybe<Test>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type GetUserResponse = {
  __typename?: 'GetUserResponse';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type LinkedTest = {
  __typename?: 'LinkedTest';
  test: Test;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttendant: AddAttendantResponse;
  addMoreAttendant: AddMoreAttendantResponse;
  addQuestionToTest: AddQuestionToTestResponse;
  addTest: AddTestResponse;
  answerMcQuestion: AnswerResponse;
  authenticate: AuthenticateResponse;
  changeQuestionStatus: AddQuestionResponse;
  changeStatus: WhoIsDoingQuizResponse;
  editMcQuestion: AddQuestionResponse;
  logout: GetUserResponse;
  publishTest: AddTestResponse;
  setupMultipleChoiceQuestion: AddQuestionResponse;
  verifyTestUri: VerifyTestUriResponse;
};


export type MutationAddAttendantArgs = {
  args: AddAttendantArgs;
  testId: Scalars['String']['input'];
};


export type MutationAddMoreAttendantArgs = {
  candidates: Array<AddAttendantArgs>;
  testId: Scalars['String']['input'];
};


export type MutationAddQuestionToTestArgs = {
  question: Scalars['String']['input'];
  test: Scalars['String']['input'];
};


export type MutationAddTestArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['String']['input'];
  passMark: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationAnswerMcQuestionArgs = {
  answers: Array<Scalars['String']['input']>;
  attendant: Scalars['String']['input'];
  question: Scalars['String']['input'];
  test: Scalars['String']['input'];
};


export type MutationAuthenticateArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationChangeQuestionStatusArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationChangeStatusArgs = {
  attendant: Scalars['String']['input'];
  status: Scalars['String']['input'];
  test: Scalars['String']['input'];
};


export type MutationEditMcQuestionArgs = {
  assignToTest?: InputMaybe<Scalars['Boolean']['input']>;
  choices: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  points: Scalars['Float']['input'];
  solutions: Array<Scalars['String']['input']>;
  testId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationPublishTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationSetupMultipleChoiceQuestionArgs = {
  assignToTest?: InputMaybe<Scalars['Boolean']['input']>;
  choices: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  points: Scalars['Float']['input'];
  solutions: Array<Scalars['String']['input']>;
  testId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationVerifyTestUriArgs = {
  attendant: Scalars['String']['input'];
  test: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAnswer: GetAnswerResponse;
  getAttendantById: GetAttendantByTestResponse;
  getAttendantByTest: GetAttendantByTestResponse;
  getMyTests: GetMyTestResponse;
  getOverralGrade: GetOverralGradeResponse;
  getQuestion: GetQuestionResponse;
  getQuestionAssignedToTest: GetQuestionAssignedToTestResponse;
  getQuestions: GetQuestionsResponse;
  getSingleTest: GetSingleTestResponse;
  getUser: GetUserResponse;
  whoIsDoingQuiz: WhoIsDoingQuizResponse;
};


export type QueryGetAnswerArgs = {
  attendant: Scalars['String']['input'];
  question: Scalars['String']['input'];
  test: Scalars['String']['input'];
};


export type QueryGetAttendantByIdArgs = {
  attendantId: Scalars['String']['input'];
};


export type QueryGetAttendantByTestArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
  testId: Scalars['String']['input'];
};


export type QueryGetMyTestsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
};


export type QueryGetOverralGradeArgs = {
  attendant: Scalars['String']['input'];
  test: Scalars['String']['input'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetQuestionAssignedToTestArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
  testId: Scalars['String']['input'];
};


export type QueryGetQuestionsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
};


export type QueryGetSingleTestArgs = {
  slug: Scalars['String']['input'];
};


export type QueryWhoIsDoingQuizArgs = {
  attendant: Scalars['String']['input'];
  test: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['String']['output'];
  choices?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  points: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  solutions?: Maybe<Array<Scalars['String']['output']>>;
  status?: Maybe<Scalars['String']['output']>;
  tests: Array<LinkedTest>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Result = {
  __typename?: 'Result';
  _id: Scalars['String']['output'];
  answers: Array<AnsweredQuestions>;
  attendant: Attendant;
  createdAt?: Maybe<Scalars['String']['output']>;
  overralgrade: Scalars['String']['output'];
  status?: Maybe<Status>;
  testId: Test;
  updatedAt?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

/** Status */
export enum Status {
  Failed = 'Failed',
  Succeed = 'Succeed',
  Terminated = 'Terminated'
}

export type Test = {
  __typename?: 'Test';
  _id: Scalars['String']['output'];
  attendants?: Maybe<Array<TestAttendant>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['String']['output'];
  managerId?: Maybe<User>;
  passMark?: Maybe<Scalars['Float']['output']>;
  questions?: Maybe<Array<TestQuestion>>;
  slug: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TestAttendant = {
  __typename?: 'TestAttendant';
  attendant: Attendant;
};

export type TestQuestion = {
  __typename?: 'TestQuestion';
  question: Question;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  names?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type VerifyTestUriResponse = {
  __typename?: 'VerifyTestUriResponse';
  attendant?: Maybe<Attendant>;
  data?: Maybe<Test>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  numberOfQuestions?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  test?: Maybe<Test>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type WhoIsDoingQuizResponse = {
  __typename?: 'WhoIsDoingQuizResponse';
  attendant: Attendant;
  data?: Maybe<Attendant>;
  error?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']['output']>;
  nextPage?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  totalDocs?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type AnswerFragment = { __typename?: 'Answer', _id: string, answers: Array<string>, createdAt?: string | null, updatedAt?: string | null, grade: string, video?: string | null, questionId?: string | null, attendantId?: string | null, testId?: string | null, test: { __typename?: 'Test', status?: string | null }, question: { __typename?: 'Question', status?: string | null }, attendant: { __typename?: 'Attendant', testUri?: string | null } };

export type AnswerMcQuestionMutationVariables = Exact<{
  test: Scalars['String']['input'];
  attendant: Scalars['String']['input'];
  question: Scalars['String']['input'];
  answers: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AnswerMcQuestionMutation = { __typename?: 'Mutation', answerMcQuestion: { __typename?: 'AnswerResponse', error?: string | null, message?: string | null } };

export type GetAnswerQueryVariables = Exact<{
  test: Scalars['String']['input'];
  attendant: Scalars['String']['input'];
  question: Scalars['String']['input'];
}>;


export type GetAnswerQuery = { __typename?: 'Query', getAnswer: { __typename?: 'GetAnswerResponse', error?: string | null, data?: { __typename?: 'Answer', _id: string, answers: Array<string>, createdAt?: string | null, updatedAt?: string | null, grade: string, video?: string | null, questionId?: string | null, attendantId?: string | null, testId?: string | null, test: { __typename?: 'Test', status?: string | null }, question: { __typename?: 'Question', status?: string | null }, attendant: { __typename?: 'Attendant', testUri?: string | null } } | null } };

export type AttendantFragment = { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null };

export type GetAttendantByTestQueryVariables = Exact<{
  testId: Scalars['String']['input'];
  page: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAttendantByTestQuery = { __typename?: 'Query', getAttendantByTest: { __typename?: 'GetAttendantByTestResponse', totalDocs?: number | null, totalPages?: number | null, nextPage?: number | null, inProgressDoc?: number | null, startedDoc?: number | null, completedDoc?: number | null, error?: string | null, items: Array<{ __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null }> } };

export type AddAttendantMutationVariables = Exact<{
  testId: Scalars['String']['input'];
  args: AddAttendantArgs;
}>;


export type AddAttendantMutation = { __typename?: 'Mutation', addAttendant: { __typename?: 'AddAttendantResponse', error?: string | null, data?: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } | null } };

export type AddMoreAttendantMutationVariables = Exact<{
  testId: Scalars['String']['input'];
  candidates: Array<AddAttendantArgs> | AddAttendantArgs;
}>;


export type AddMoreAttendantMutation = { __typename?: 'Mutation', addMoreAttendant: { __typename?: 'AddMoreAttendantResponse', error?: string | null, message?: string | null, items?: Array<{ __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null }> | null } };

export type GetAttendantByIdQueryVariables = Exact<{
  attendantId: Scalars['String']['input'];
}>;


export type GetAttendantByIdQuery = { __typename?: 'Query', getAttendantById: { __typename?: 'GetAttendantByTestResponse', error?: string | null, data?: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } | null } };

export type WhoIsDoingQuizQueryVariables = Exact<{
  test: Scalars['String']['input'];
  attendant: Scalars['String']['input'];
}>;


export type WhoIsDoingQuizQuery = { __typename?: 'Query', whoIsDoingQuiz: { __typename?: 'WhoIsDoingQuizResponse', error?: string | null, attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } } };

export type ChangeStatusMutationVariables = Exact<{
  test: Scalars['String']['input'];
  attendant: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type ChangeStatusMutation = { __typename?: 'Mutation', changeStatus: { __typename?: 'WhoIsDoingQuizResponse', message?: string | null, error?: string | null, attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } } };

export type QuestionFragment = { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null };

export type SetupMcQuestionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  choices: Array<Scalars['String']['input']> | Scalars['String']['input'];
  solutions: Array<Scalars['String']['input']> | Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  testId?: InputMaybe<Scalars['String']['input']>;
  assignToTest?: InputMaybe<Scalars['Boolean']['input']>;
  points: Scalars['Float']['input'];
}>;


export type SetupMcQuestionMutation = { __typename?: 'Mutation', setupMultipleChoiceQuestion: { __typename?: 'AddQuestionResponse', message?: string | null, error?: string | null, data?: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } | null } };

export type GetQuestionAssignedToTestQueryVariables = Exact<{
  page: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  testId: Scalars['String']['input'];
}>;


export type GetQuestionAssignedToTestQuery = { __typename?: 'Query', getQuestionAssignedToTest: { __typename?: 'GetQuestionAssignedToTestResponse', totalPages?: number | null, totalDocs?: number | null, error?: string | null, testId?: string | null, items: Array<{ __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null }> } };

export type AddQuestionToTestMutationVariables = Exact<{
  test: Scalars['String']['input'];
  question: Scalars['String']['input'];
}>;


export type AddQuestionToTestMutation = { __typename?: 'Mutation', addQuestionToTest: { __typename?: 'AddQuestionToTestResponse', message?: string | null, error?: string | null } };

export type GetQuestionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetQuestionQuery = { __typename?: 'Query', getQuestion: { __typename?: 'GetQuestionResponse', error?: string | null, data?: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } | null } };

export type GetOverralGradeQueryVariables = Exact<{
  test: Scalars['String']['input'];
  attendant: Scalars['String']['input'];
}>;


export type GetOverralGradeQuery = { __typename?: 'Query', getOverralGrade: { __typename?: 'GetOverralGradeResponse', error?: string | null, overralgrade?: string | null } };

export type TestFragment = { __typename?: 'Test', _id: string, title: string, subject: string, description?: string | null, startDate: string, endDate: string, createdAt?: string | null, updatedAt?: string | null, slug: string, status?: string | null, passMark?: number | null, questions?: Array<{ __typename?: 'TestQuestion', question: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } }> | null, attendants?: Array<{ __typename?: 'TestAttendant', attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } }> | null };

export type SetupTestMutationVariables = Exact<{
  title: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  passMark: Scalars['Float']['input'];
}>;


export type SetupTestMutation = { __typename?: 'Mutation', addTest: { __typename?: 'AddTestResponse', message?: string | null, error?: string | null, data?: { __typename?: 'Test', _id: string, title: string, subject: string, description?: string | null, startDate: string, endDate: string, createdAt?: string | null, updatedAt?: string | null, slug: string, status?: string | null, passMark?: number | null, questions?: Array<{ __typename?: 'TestQuestion', question: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } }> | null, attendants?: Array<{ __typename?: 'TestAttendant', attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } }> | null } | null } };

export type GetMyTestsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
}>;


export type GetMyTestsQuery = { __typename?: 'Query', getMyTests: { __typename?: 'GetMyTestResponse', error?: string | null, totalDocs?: number | null, totalPages?: number | null, items?: Array<{ __typename?: 'Test', _id: string, title: string, subject: string, description?: string | null, startDate: string, endDate: string, createdAt?: string | null, updatedAt?: string | null, slug: string, status?: string | null, passMark?: number | null, questions?: Array<{ __typename?: 'TestQuestion', question: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } }> | null, attendants?: Array<{ __typename?: 'TestAttendant', attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } }> | null }> | null } };

export type PublishTestMutationVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type PublishTestMutation = { __typename?: 'Mutation', publishTest: { __typename?: 'AddTestResponse', message?: string | null, error?: string | null } };

export type GetSingleTestQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetSingleTestQuery = { __typename?: 'Query', getSingleTest: { __typename?: 'GetSingleTestResponse', error?: string | null, data?: { __typename?: 'Test', _id: string, title: string, subject: string, description?: string | null, startDate: string, endDate: string, createdAt?: string | null, updatedAt?: string | null, slug: string, status?: string | null, passMark?: number | null, questions?: Array<{ __typename?: 'TestQuestion', question: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } }> | null, attendants?: Array<{ __typename?: 'TestAttendant', attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } }> | null } | null } };

export type VerifyTestUriMutationVariables = Exact<{
  test: Scalars['String']['input'];
  attendant: Scalars['String']['input'];
}>;


export type VerifyTestUriMutation = { __typename?: 'Mutation', verifyTestUri: { __typename?: 'VerifyTestUriResponse', message?: string | null, error?: string | null, verified?: boolean | null, numberOfQuestions?: number | null, attendant?: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } | null, test?: { __typename?: 'Test', _id: string, title: string, subject: string, description?: string | null, startDate: string, endDate: string, createdAt?: string | null, updatedAt?: string | null, slug: string, status?: string | null, passMark?: number | null, questions?: Array<{ __typename?: 'TestQuestion', question: { __typename?: 'Question', _id: string, title: string, type?: string | null, slug: string, status?: string | null, description?: string | null, choices?: Array<string> | null, solutions?: Array<string> | null, points: number, createdAt?: string | null, updatedAt?: string | null, owner?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } }> | null, attendants?: Array<{ __typename?: 'TestAttendant', attendant: { __typename?: 'Attendant', _id: string, names: string, email: string, phoneNumber: string, testUri?: string | null, status?: string | null, createdAt?: string | null, updatedAt?: string | null, testId?: string | null, test?: { __typename?: 'AttendantRefTest', _id: string, title: string, status: string } | null } }> | null } | null } };

export type UserFragment = { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GetUserResponse', error?: string | null, data?: { __typename?: 'User', _id: string, email: string, names?: string | null, createdAt?: string | null, updatedAt?: string | null, username?: string | null, role?: string | null, slug?: string | null, profilePicture?: string | null } | null } };

export type AuthenticateMutationVariables = Exact<{
  idToken: Scalars['String']['input'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthenticateResponse', message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'GetUserResponse', message?: string | null, error?: string | null } };

export const AnswerFragmentDoc = gql`
    fragment Answer on Answer {
  _id
  answers
  createdAt
  updatedAt
  test {
    status
  }
  question {
    status
  }
  attendant {
    testUri
  }
  grade
  video
  questionId
  attendantId
  testId
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  _id
  email
  names
  createdAt
  updatedAt
  username
  role
  slug
  profilePicture
}
    `;
export const QuestionFragmentDoc = gql`
    fragment Question on Question {
  _id
  title
  type
  slug
  status
  description
  choices
  solutions
  points
  createdAt
  updatedAt
  owner {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const AttendantFragmentDoc = gql`
    fragment Attendant on Attendant {
  _id
  names
  email
  phoneNumber
  testUri
  status
  createdAt
  updatedAt
  testId
  test {
    _id
    title
    status
  }
}
    `;
export const TestFragmentDoc = gql`
    fragment Test on Test {
  _id
  title
  subject
  description
  startDate
  endDate
  createdAt
  updatedAt
  slug
  status
  passMark
  questions {
    question {
      ...Question
    }
  }
  attendants {
    attendant {
      ...Attendant
    }
  }
}
    ${QuestionFragmentDoc}
${AttendantFragmentDoc}`;
export const AnswerMcQuestionDocument = gql`
    mutation AnswerMcQuestion($test: String!, $attendant: String!, $question: String!, $answers: [String!]!) {
  answerMcQuestion(
    test: $test
    attendant: $attendant
    question: $question
    answers: $answers
  ) {
    error
    message
  }
}
    `;
export type AnswerMcQuestionMutationFn = Apollo.MutationFunction<AnswerMcQuestionMutation, AnswerMcQuestionMutationVariables>;

/**
 * __useAnswerMcQuestionMutation__
 *
 * To run a mutation, you first call `useAnswerMcQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerMcQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerMcQuestionMutation, { data, loading, error }] = useAnswerMcQuestionMutation({
 *   variables: {
 *      test: // value for 'test'
 *      attendant: // value for 'attendant'
 *      question: // value for 'question'
 *      answers: // value for 'answers'
 *   },
 * });
 */
export function useAnswerMcQuestionMutation(baseOptions?: Apollo.MutationHookOptions<AnswerMcQuestionMutation, AnswerMcQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnswerMcQuestionMutation, AnswerMcQuestionMutationVariables>(AnswerMcQuestionDocument, options);
      }
export type AnswerMcQuestionMutationHookResult = ReturnType<typeof useAnswerMcQuestionMutation>;
export type AnswerMcQuestionMutationResult = Apollo.MutationResult<AnswerMcQuestionMutation>;
export type AnswerMcQuestionMutationOptions = Apollo.BaseMutationOptions<AnswerMcQuestionMutation, AnswerMcQuestionMutationVariables>;
export const GetAnswerDocument = gql`
    query GetAnswer($test: String!, $attendant: String!, $question: String!) {
  getAnswer(test: $test, attendant: $attendant, question: $question) {
    data {
      ...Answer
    }
    error
  }
}
    ${AnswerFragmentDoc}`;

/**
 * __useGetAnswerQuery__
 *
 * To run a query within a React component, call `useGetAnswerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnswerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnswerQuery({
 *   variables: {
 *      test: // value for 'test'
 *      attendant: // value for 'attendant'
 *      question: // value for 'question'
 *   },
 * });
 */
export function useGetAnswerQuery(baseOptions: Apollo.QueryHookOptions<GetAnswerQuery, GetAnswerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnswerQuery, GetAnswerQueryVariables>(GetAnswerDocument, options);
      }
export function useGetAnswerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnswerQuery, GetAnswerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnswerQuery, GetAnswerQueryVariables>(GetAnswerDocument, options);
        }
export type GetAnswerQueryHookResult = ReturnType<typeof useGetAnswerQuery>;
export type GetAnswerLazyQueryHookResult = ReturnType<typeof useGetAnswerLazyQuery>;
export type GetAnswerQueryResult = Apollo.QueryResult<GetAnswerQuery, GetAnswerQueryVariables>;
export const GetAttendantByTestDocument = gql`
    query GetAttendantByTest($testId: String!, $page: Float!, $limit: Float) {
  getAttendantByTest(testId: $testId, page: $page, limit: $limit) {
    items {
      ...Attendant
    }
    totalDocs
    totalPages
    nextPage
    inProgressDoc
    startedDoc
    completedDoc
    error
  }
}
    ${AttendantFragmentDoc}`;

/**
 * __useGetAttendantByTestQuery__
 *
 * To run a query within a React component, call `useGetAttendantByTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendantByTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendantByTestQuery({
 *   variables: {
 *      testId: // value for 'testId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAttendantByTestQuery(baseOptions: Apollo.QueryHookOptions<GetAttendantByTestQuery, GetAttendantByTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendantByTestQuery, GetAttendantByTestQueryVariables>(GetAttendantByTestDocument, options);
      }
export function useGetAttendantByTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendantByTestQuery, GetAttendantByTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendantByTestQuery, GetAttendantByTestQueryVariables>(GetAttendantByTestDocument, options);
        }
export type GetAttendantByTestQueryHookResult = ReturnType<typeof useGetAttendantByTestQuery>;
export type GetAttendantByTestLazyQueryHookResult = ReturnType<typeof useGetAttendantByTestLazyQuery>;
export type GetAttendantByTestQueryResult = Apollo.QueryResult<GetAttendantByTestQuery, GetAttendantByTestQueryVariables>;
export const AddAttendantDocument = gql`
    mutation AddAttendant($testId: String!, $args: AddAttendantArgs!) {
  addAttendant(testId: $testId, args: $args) {
    data {
      ...Attendant
    }
    error
  }
}
    ${AttendantFragmentDoc}`;
export type AddAttendantMutationFn = Apollo.MutationFunction<AddAttendantMutation, AddAttendantMutationVariables>;

/**
 * __useAddAttendantMutation__
 *
 * To run a mutation, you first call `useAddAttendantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAttendantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAttendantMutation, { data, loading, error }] = useAddAttendantMutation({
 *   variables: {
 *      testId: // value for 'testId'
 *      args: // value for 'args'
 *   },
 * });
 */
export function useAddAttendantMutation(baseOptions?: Apollo.MutationHookOptions<AddAttendantMutation, AddAttendantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAttendantMutation, AddAttendantMutationVariables>(AddAttendantDocument, options);
      }
export type AddAttendantMutationHookResult = ReturnType<typeof useAddAttendantMutation>;
export type AddAttendantMutationResult = Apollo.MutationResult<AddAttendantMutation>;
export type AddAttendantMutationOptions = Apollo.BaseMutationOptions<AddAttendantMutation, AddAttendantMutationVariables>;
export const AddMoreAttendantDocument = gql`
    mutation AddMoreAttendant($testId: String!, $candidates: [AddAttendantArgs!]!) {
  addMoreAttendant(testId: $testId, candidates: $candidates) {
    items {
      ...Attendant
    }
    error
    message
  }
}
    ${AttendantFragmentDoc}`;
export type AddMoreAttendantMutationFn = Apollo.MutationFunction<AddMoreAttendantMutation, AddMoreAttendantMutationVariables>;

/**
 * __useAddMoreAttendantMutation__
 *
 * To run a mutation, you first call `useAddMoreAttendantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMoreAttendantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMoreAttendantMutation, { data, loading, error }] = useAddMoreAttendantMutation({
 *   variables: {
 *      testId: // value for 'testId'
 *      candidates: // value for 'candidates'
 *   },
 * });
 */
export function useAddMoreAttendantMutation(baseOptions?: Apollo.MutationHookOptions<AddMoreAttendantMutation, AddMoreAttendantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMoreAttendantMutation, AddMoreAttendantMutationVariables>(AddMoreAttendantDocument, options);
      }
export type AddMoreAttendantMutationHookResult = ReturnType<typeof useAddMoreAttendantMutation>;
export type AddMoreAttendantMutationResult = Apollo.MutationResult<AddMoreAttendantMutation>;
export type AddMoreAttendantMutationOptions = Apollo.BaseMutationOptions<AddMoreAttendantMutation, AddMoreAttendantMutationVariables>;
export const GetAttendantByIdDocument = gql`
    query GetAttendantById($attendantId: String!) {
  getAttendantById(attendantId: $attendantId) {
    data {
      ...Attendant
    }
    error
  }
}
    ${AttendantFragmentDoc}`;

/**
 * __useGetAttendantByIdQuery__
 *
 * To run a query within a React component, call `useGetAttendantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendantByIdQuery({
 *   variables: {
 *      attendantId: // value for 'attendantId'
 *   },
 * });
 */
export function useGetAttendantByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAttendantByIdQuery, GetAttendantByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttendantByIdQuery, GetAttendantByIdQueryVariables>(GetAttendantByIdDocument, options);
      }
export function useGetAttendantByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttendantByIdQuery, GetAttendantByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttendantByIdQuery, GetAttendantByIdQueryVariables>(GetAttendantByIdDocument, options);
        }
export type GetAttendantByIdQueryHookResult = ReturnType<typeof useGetAttendantByIdQuery>;
export type GetAttendantByIdLazyQueryHookResult = ReturnType<typeof useGetAttendantByIdLazyQuery>;
export type GetAttendantByIdQueryResult = Apollo.QueryResult<GetAttendantByIdQuery, GetAttendantByIdQueryVariables>;
export const WhoIsDoingQuizDocument = gql`
    query WhoIsDoingQuiz($test: String!, $attendant: String!) {
  whoIsDoingQuiz(test: $test, attendant: $attendant) {
    error
    attendant {
      ...Attendant
    }
  }
}
    ${AttendantFragmentDoc}`;

/**
 * __useWhoIsDoingQuizQuery__
 *
 * To run a query within a React component, call `useWhoIsDoingQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoIsDoingQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoIsDoingQuizQuery({
 *   variables: {
 *      test: // value for 'test'
 *      attendant: // value for 'attendant'
 *   },
 * });
 */
export function useWhoIsDoingQuizQuery(baseOptions: Apollo.QueryHookOptions<WhoIsDoingQuizQuery, WhoIsDoingQuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoIsDoingQuizQuery, WhoIsDoingQuizQueryVariables>(WhoIsDoingQuizDocument, options);
      }
export function useWhoIsDoingQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoIsDoingQuizQuery, WhoIsDoingQuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoIsDoingQuizQuery, WhoIsDoingQuizQueryVariables>(WhoIsDoingQuizDocument, options);
        }
export type WhoIsDoingQuizQueryHookResult = ReturnType<typeof useWhoIsDoingQuizQuery>;
export type WhoIsDoingQuizLazyQueryHookResult = ReturnType<typeof useWhoIsDoingQuizLazyQuery>;
export type WhoIsDoingQuizQueryResult = Apollo.QueryResult<WhoIsDoingQuizQuery, WhoIsDoingQuizQueryVariables>;
export const ChangeStatusDocument = gql`
    mutation ChangeStatus($test: String!, $attendant: String!, $status: String!) {
  changeStatus(test: $test, attendant: $attendant, status: $status) {
    message
    error
    attendant {
      ...Attendant
    }
  }
}
    ${AttendantFragmentDoc}`;
export type ChangeStatusMutationFn = Apollo.MutationFunction<ChangeStatusMutation, ChangeStatusMutationVariables>;

/**
 * __useChangeStatusMutation__
 *
 * To run a mutation, you first call `useChangeStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStatusMutation, { data, loading, error }] = useChangeStatusMutation({
 *   variables: {
 *      test: // value for 'test'
 *      attendant: // value for 'attendant'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStatusMutation, ChangeStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStatusMutation, ChangeStatusMutationVariables>(ChangeStatusDocument, options);
      }
export type ChangeStatusMutationHookResult = ReturnType<typeof useChangeStatusMutation>;
export type ChangeStatusMutationResult = Apollo.MutationResult<ChangeStatusMutation>;
export type ChangeStatusMutationOptions = Apollo.BaseMutationOptions<ChangeStatusMutation, ChangeStatusMutationVariables>;
export const SetupMcQuestionDocument = gql`
    mutation SetupMcQuestion($title: String!, $choices: [String!]!, $solutions: [String!]!, $description: String, $testId: String, $assignToTest: Boolean, $points: Float!) {
  setupMultipleChoiceQuestion(
    title: $title
    choices: $choices
    solutions: $solutions
    description: $description
    testId: $testId
    assignToTest: $assignToTest
    points: $points
  ) {
    message
    error
    data {
      ...Question
    }
  }
}
    ${QuestionFragmentDoc}`;
export type SetupMcQuestionMutationFn = Apollo.MutationFunction<SetupMcQuestionMutation, SetupMcQuestionMutationVariables>;

/**
 * __useSetupMcQuestionMutation__
 *
 * To run a mutation, you first call `useSetupMcQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupMcQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupMcQuestionMutation, { data, loading, error }] = useSetupMcQuestionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      choices: // value for 'choices'
 *      solutions: // value for 'solutions'
 *      description: // value for 'description'
 *      testId: // value for 'testId'
 *      assignToTest: // value for 'assignToTest'
 *      points: // value for 'points'
 *   },
 * });
 */
export function useSetupMcQuestionMutation(baseOptions?: Apollo.MutationHookOptions<SetupMcQuestionMutation, SetupMcQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupMcQuestionMutation, SetupMcQuestionMutationVariables>(SetupMcQuestionDocument, options);
      }
export type SetupMcQuestionMutationHookResult = ReturnType<typeof useSetupMcQuestionMutation>;
export type SetupMcQuestionMutationResult = Apollo.MutationResult<SetupMcQuestionMutation>;
export type SetupMcQuestionMutationOptions = Apollo.BaseMutationOptions<SetupMcQuestionMutation, SetupMcQuestionMutationVariables>;
export const GetQuestionAssignedToTestDocument = gql`
    query GetQuestionAssignedToTest($page: Float!, $limit: Float, $testId: String!) {
  getQuestionAssignedToTest(page: $page, limit: $limit, testId: $testId) {
    items {
      ...Question
    }
    totalPages
    totalDocs
    error
    testId
  }
}
    ${QuestionFragmentDoc}`;

/**
 * __useGetQuestionAssignedToTestQuery__
 *
 * To run a query within a React component, call `useGetQuestionAssignedToTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionAssignedToTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionAssignedToTestQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      testId: // value for 'testId'
 *   },
 * });
 */
export function useGetQuestionAssignedToTestQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionAssignedToTestQuery, GetQuestionAssignedToTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionAssignedToTestQuery, GetQuestionAssignedToTestQueryVariables>(GetQuestionAssignedToTestDocument, options);
      }
export function useGetQuestionAssignedToTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionAssignedToTestQuery, GetQuestionAssignedToTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionAssignedToTestQuery, GetQuestionAssignedToTestQueryVariables>(GetQuestionAssignedToTestDocument, options);
        }
export type GetQuestionAssignedToTestQueryHookResult = ReturnType<typeof useGetQuestionAssignedToTestQuery>;
export type GetQuestionAssignedToTestLazyQueryHookResult = ReturnType<typeof useGetQuestionAssignedToTestLazyQuery>;
export type GetQuestionAssignedToTestQueryResult = Apollo.QueryResult<GetQuestionAssignedToTestQuery, GetQuestionAssignedToTestQueryVariables>;
export const AddQuestionToTestDocument = gql`
    mutation AddQuestionToTest($test: String!, $question: String!) {
  addQuestionToTest(test: $test, question: $question) {
    message
    error
  }
}
    `;
export type AddQuestionToTestMutationFn = Apollo.MutationFunction<AddQuestionToTestMutation, AddQuestionToTestMutationVariables>;

/**
 * __useAddQuestionToTestMutation__
 *
 * To run a mutation, you first call `useAddQuestionToTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuestionToTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuestionToTestMutation, { data, loading, error }] = useAddQuestionToTestMutation({
 *   variables: {
 *      test: // value for 'test'
 *      question: // value for 'question'
 *   },
 * });
 */
export function useAddQuestionToTestMutation(baseOptions?: Apollo.MutationHookOptions<AddQuestionToTestMutation, AddQuestionToTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQuestionToTestMutation, AddQuestionToTestMutationVariables>(AddQuestionToTestDocument, options);
      }
export type AddQuestionToTestMutationHookResult = ReturnType<typeof useAddQuestionToTestMutation>;
export type AddQuestionToTestMutationResult = Apollo.MutationResult<AddQuestionToTestMutation>;
export type AddQuestionToTestMutationOptions = Apollo.BaseMutationOptions<AddQuestionToTestMutation, AddQuestionToTestMutationVariables>;
export const GetQuestionDocument = gql`
    query GetQuestion($id: String!) {
  getQuestion(id: $id) {
    data {
      ...Question
    }
    error
  }
}
    ${QuestionFragmentDoc}`;

/**
 * __useGetQuestionQuery__
 *
 * To run a query within a React component, call `useGetQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
      }
export function useGetQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
        }
export type GetQuestionQueryHookResult = ReturnType<typeof useGetQuestionQuery>;
export type GetQuestionLazyQueryHookResult = ReturnType<typeof useGetQuestionLazyQuery>;
export type GetQuestionQueryResult = Apollo.QueryResult<GetQuestionQuery, GetQuestionQueryVariables>;
export const GetOverralGradeDocument = gql`
    query GetOverralGrade($test: String!, $attendant: String!) {
  getOverralGrade(test: $test, attendant: $attendant) {
    error
    overralgrade
  }
}
    `;

/**
 * __useGetOverralGradeQuery__
 *
 * To run a query within a React component, call `useGetOverralGradeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOverralGradeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOverralGradeQuery({
 *   variables: {
 *      test: // value for 'test'
 *      attendant: // value for 'attendant'
 *   },
 * });
 */
export function useGetOverralGradeQuery(baseOptions: Apollo.QueryHookOptions<GetOverralGradeQuery, GetOverralGradeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOverralGradeQuery, GetOverralGradeQueryVariables>(GetOverralGradeDocument, options);
      }
export function useGetOverralGradeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOverralGradeQuery, GetOverralGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOverralGradeQuery, GetOverralGradeQueryVariables>(GetOverralGradeDocument, options);
        }
export type GetOverralGradeQueryHookResult = ReturnType<typeof useGetOverralGradeQuery>;
export type GetOverralGradeLazyQueryHookResult = ReturnType<typeof useGetOverralGradeLazyQuery>;
export type GetOverralGradeQueryResult = Apollo.QueryResult<GetOverralGradeQuery, GetOverralGradeQueryVariables>;
export const SetupTestDocument = gql`
    mutation SetupTest($title: String!, $startDate: String!, $endDate: String!, $description: String, $subject: String!, $passMark: Float!) {
  addTest(
    title: $title
    startDate: $startDate
    endDate: $endDate
    description: $description
    subject: $subject
    passMark: $passMark
  ) {
    message
    error
    data {
      ...Test
    }
  }
}
    ${TestFragmentDoc}`;
export type SetupTestMutationFn = Apollo.MutationFunction<SetupTestMutation, SetupTestMutationVariables>;

/**
 * __useSetupTestMutation__
 *
 * To run a mutation, you first call `useSetupTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupTestMutation, { data, loading, error }] = useSetupTestMutation({
 *   variables: {
 *      title: // value for 'title'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      description: // value for 'description'
 *      subject: // value for 'subject'
 *      passMark: // value for 'passMark'
 *   },
 * });
 */
export function useSetupTestMutation(baseOptions?: Apollo.MutationHookOptions<SetupTestMutation, SetupTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupTestMutation, SetupTestMutationVariables>(SetupTestDocument, options);
      }
export type SetupTestMutationHookResult = ReturnType<typeof useSetupTestMutation>;
export type SetupTestMutationResult = Apollo.MutationResult<SetupTestMutation>;
export type SetupTestMutationOptions = Apollo.BaseMutationOptions<SetupTestMutation, SetupTestMutationVariables>;
export const GetMyTestsDocument = gql`
    query GetMyTests($limit: Float, $page: Float!) {
  getMyTests(limit: $limit, page: $page) {
    error
    items {
      ...Test
    }
    totalDocs
    totalPages
  }
}
    ${TestFragmentDoc}`;

/**
 * __useGetMyTestsQuery__
 *
 * To run a query within a React component, call `useGetMyTestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTestsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetMyTestsQuery(baseOptions: Apollo.QueryHookOptions<GetMyTestsQuery, GetMyTestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTestsQuery, GetMyTestsQueryVariables>(GetMyTestsDocument, options);
      }
export function useGetMyTestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTestsQuery, GetMyTestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTestsQuery, GetMyTestsQueryVariables>(GetMyTestsDocument, options);
        }
export type GetMyTestsQueryHookResult = ReturnType<typeof useGetMyTestsQuery>;
export type GetMyTestsLazyQueryHookResult = ReturnType<typeof useGetMyTestsLazyQuery>;
export type GetMyTestsQueryResult = Apollo.QueryResult<GetMyTestsQuery, GetMyTestsQueryVariables>;
export const PublishTestDocument = gql`
    mutation PublishTest($testId: String!) {
  publishTest(testId: $testId) {
    message
    error
  }
}
    `;
export type PublishTestMutationFn = Apollo.MutationFunction<PublishTestMutation, PublishTestMutationVariables>;

/**
 * __usePublishTestMutation__
 *
 * To run a mutation, you first call `usePublishTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishTestMutation, { data, loading, error }] = usePublishTestMutation({
 *   variables: {
 *      testId: // value for 'testId'
 *   },
 * });
 */
export function usePublishTestMutation(baseOptions?: Apollo.MutationHookOptions<PublishTestMutation, PublishTestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishTestMutation, PublishTestMutationVariables>(PublishTestDocument, options);
      }
export type PublishTestMutationHookResult = ReturnType<typeof usePublishTestMutation>;
export type PublishTestMutationResult = Apollo.MutationResult<PublishTestMutation>;
export type PublishTestMutationOptions = Apollo.BaseMutationOptions<PublishTestMutation, PublishTestMutationVariables>;
export const GetSingleTestDocument = gql`
    query GetSingleTest($slug: String!) {
  getSingleTest(slug: $slug) {
    data {
      ...Test
    }
    error
  }
}
    ${TestFragmentDoc}`;

/**
 * __useGetSingleTestQuery__
 *
 * To run a query within a React component, call `useGetSingleTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleTestQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetSingleTestQuery(baseOptions: Apollo.QueryHookOptions<GetSingleTestQuery, GetSingleTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleTestQuery, GetSingleTestQueryVariables>(GetSingleTestDocument, options);
      }
export function useGetSingleTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleTestQuery, GetSingleTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleTestQuery, GetSingleTestQueryVariables>(GetSingleTestDocument, options);
        }
export type GetSingleTestQueryHookResult = ReturnType<typeof useGetSingleTestQuery>;
export type GetSingleTestLazyQueryHookResult = ReturnType<typeof useGetSingleTestLazyQuery>;
export type GetSingleTestQueryResult = Apollo.QueryResult<GetSingleTestQuery, GetSingleTestQueryVariables>;
export const VerifyTestUriDocument = gql`
    mutation VerifyTestUri($test: String!, $attendant: String!) {
  verifyTestUri(test: $test, attendant: $attendant) {
    message
    error
    verified
    attendant {
      ...Attendant
    }
    test {
      ...Test
    }
    numberOfQuestions
  }
}
    ${AttendantFragmentDoc}
${TestFragmentDoc}`;
export type VerifyTestUriMutationFn = Apollo.MutationFunction<VerifyTestUriMutation, VerifyTestUriMutationVariables>;

/**
 * __useVerifyTestUriMutation__
 *
 * To run a mutation, you first call `useVerifyTestUriMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTestUriMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTestUriMutation, { data, loading, error }] = useVerifyTestUriMutation({
 *   variables: {
 *      test: // value for 'test'
 *      attendant: // value for 'attendant'
 *   },
 * });
 */
export function useVerifyTestUriMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTestUriMutation, VerifyTestUriMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTestUriMutation, VerifyTestUriMutationVariables>(VerifyTestUriDocument, options);
      }
export type VerifyTestUriMutationHookResult = ReturnType<typeof useVerifyTestUriMutation>;
export type VerifyTestUriMutationResult = Apollo.MutationResult<VerifyTestUriMutation>;
export type VerifyTestUriMutationOptions = Apollo.BaseMutationOptions<VerifyTestUriMutation, VerifyTestUriMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    error
    data {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const AuthenticateDocument = gql`
    mutation Authenticate($idToken: String!) {
  authenticate(idToken: $idToken) {
    message
  }
}
    `;
export type AuthenticateMutationFn = Apollo.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
    error
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;