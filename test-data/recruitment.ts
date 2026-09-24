export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  vacancy: string;
}
export const candidate = (email: string): CandidateData => ({
  firstName: 'Automation',
  lastName: 'Candidate',
  email,
  vacancy: 'Software Engineer',
});
