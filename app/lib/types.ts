import type { BloodTypeEnum, SexEnum } from "./enums";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
};

type VisitBase = {
  visit_date: string;
  doctor_name: string;
  reason: string;
  diagnosis: string;
  notes?: string;
};

export type VisitCreate = VisitBase;

export type Visit = VisitBase & {
  id: string;
  user_id: string;
};

type ProfileBase = {
  sex: SexEnum;
  birth_date: string;
  blood_type: BloodTypeEnum;
}

export type ProfileFormValues = Omit<ProfileBase, "birth_date"> & {
  birth_date: Date
};

export type ProfileData = ProfileBase;

export type Profile = ProfileBase & {
  id: string;
  user_id: string;
}