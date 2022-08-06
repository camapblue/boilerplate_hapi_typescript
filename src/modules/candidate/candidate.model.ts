import mongoose from 'mongoose';
import { Candidate } from './candidate.interface';
const { Schema } = mongoose;

export type CandidateDocument = Candidate & Document;

const candidateSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

export const CandidateModel = mongoose.model('Candidate', candidateSchema);
