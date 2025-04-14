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
