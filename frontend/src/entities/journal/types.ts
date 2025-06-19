export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJournalEntryDto = {
  date: string;
  content: string;
};

export type UpdateJournalEntryDto = {
  date?: string;
  content?: string;
};
