export type PlayerResult = {
  Result: string;
  Diff: number;
  BUE: string;
  GRH: string;
  OCP: string;
  ICP: string;
  IBP: string;
  PEN: string;
};

export type Result = {
  UserID: string;
  ScorecardID: string;
  Name: string;
  ClassName: string;
  CountryCode: string;
  PlayerResults: PlayerResult[];
  Penalty?: any;
  Sum: number;
  Diff: number;
  DNF?: any;
  BUETotal: string;
  GRHTotal: string;
  OCPTotal: string;
  ICPTotal: string;
  IBPTotal: string;
  PenaltiesTotal: string;
  PreviousRoundsSum?: any;
  PreviousRoundsDiff?: any;
  OrderNumber: number;
  CourseId: string;
};

export type Track = {
  Number: string;
  NumberAlt: string;
  Par: string;
};

export type Competition = {
  ID: number;
  Name: string;
  Type: string;
  TourDateStart?: any;
  TourDateEnd?: any;
  Date: string;
  Time: string;
  Comment: string;
  CourseName: string;
  CourseID: string;
  MetrixMode: string;
  ShowPreviousRoundsSum?: any;
  HasSubcompetitions: number;
  WeeklyHCSummary?: any;
  WeeklyHC: any[];
  Results: Result[];
  Tracks: Track[];
};

export type Score = {
  UserId: string;
  Scores: Result[];
  UserName: string;
  Rating: number;
};

export type FrontPageData = {
  competitions: Competition[];
  scores: Score[];
};
