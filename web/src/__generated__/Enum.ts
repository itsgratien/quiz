export enum UserRole {
  Admin = 'ADMIN',
  SuperAdmin = 'SuperAdmin',
  Manager = 'Manager',
  SuperManager = 'SuperManager',
}

export enum TestStatus {
  Published = 'Published',
  Draft = 'Draft',
  Closed = 'Closed',
}

export enum AttendantStatus {
  Started = 'Started',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export enum QuestionType {
  MultipleChoice = 'MultipleChoice',
  Coding = 'Coding',
}

export enum ChoiceTypeEnum {
  MultipleChoice = 'Multiple Choice',
  SingleChoice = 'Single Choice',
}

export enum SetupStep {
  SetupQuiz = 'SetupQuiz',
  Question = 'Question',
  Attendant = 'Attendant',
}
