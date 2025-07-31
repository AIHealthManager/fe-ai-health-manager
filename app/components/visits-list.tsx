"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "~/components/ui/pagination";
import { getUserVisits } from "~/api/visit";
import type { Visit } from "~/lib/types";

const ITEMS_PER_PAGE = 5;

export default function VisitsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [visits, setVisits] = useState<Visit[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token") as string;
      const data = await getUserVisits(token);
      setVisits(data);
    })();
  }, [currentPage]);

  const totalPages = Math.ceil(visits.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">Doctor Visits</CardTitle>
            <CardDescription>Review your past medical visits.</CardDescription>
          </div>
          <Button
            onClick={() => navigate("/add-visit")}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
          >
            + Add Doctor Visit
          </Button>
        </CardHeader>

        <CardContent>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Referred By</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Observations</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Referred To</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Intervention</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.visit_datetime ? format(new Date(visit.visit_datetime), "PPP") : "—"}</TableCell>
                  <TableCell>{visit.location ?? "—"}</TableCell>
                  <TableCell>{visit.doctor_name ?? "—"}</TableCell>
                  <TableCell>{visit.referred_by ?? "—"}</TableCell>
                  <TableCell>{visit.reason}</TableCell>
                  <TableCell>{visit.observations ?? "—"}</TableCell>
                  <TableCell>{visit.diagnosis ?? "—"}</TableCell>
                  <TableCell>{visit.referred_to ?? "—"}</TableCell>
                  <TableCell>{visit.treatment ?? "—"}</TableCell>
                  <TableCell>{visit.intervention ?? "—"}</TableCell>
                  <TableCell>{visit.user_feedback ?? "—"}</TableCell>
                  <TableCell>{visit.created_at ? format(new Date(visit.created_at), "PPP p") : "—"}</TableCell>
                  <TableCell>{visit.updated_at ? format(new Date(visit.updated_at), "PPP p") : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}
