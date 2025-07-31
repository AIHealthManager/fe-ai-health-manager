import type { BloodTypeEnum, SexEnum } from "./enums";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
};

export type VisitBase = {
  visit_datetime: string; // Using string to represent datetime as per typical API string formats
  location?: string | null;
  doctor_name?: string | null;
  referred_by?: string | null;
  reason: string;
  observations?: string | null;
  diagnosis?: string | null;
  referred_to?: string | null;
  treatment?: string | null;
  intervention?: string | null;
  user_feedback?: string | null;
};

export type VisitCreate = VisitBase;

export type VisitUpdate = {
  visit_datetime?: string | null;
  location?: string | null;
  doctor_name?: string | null;
  referred_by?: string | null;
  reason?: string | null;
  observations?: string | null;
  diagnosis?: string | null;
  referred_to?: string | null;
  treatment?: string | null;
  intervention?: string | null;
  user_feedback?: string | null;
};

export type Visit = VisitBase & {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

type ProfileBase = {
  sex: SexEnum;
  birth_date: string;
  blood_type: BloodTypeEnum;
};

export type ProfileFormValues = Omit<ProfileBase, "birth_date"> & {
  birth_date: Date;
};

export type ProfileData = ProfileBase;

export type Profile = ProfileBase & {
  id: string;
  user_id: string;
};

export type ChatMessage = {
  id: string;
  role: string;
  content: string;
};

export type ChatResponse = {
  messages: ChatMessage[];
  conversation_id?: string;
};
