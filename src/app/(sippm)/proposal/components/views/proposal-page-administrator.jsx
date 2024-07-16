"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { BasePageTitle } from "@/components/base-page-title";
import { SearchInput } from "@/components/input/search-input";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Tabs } from "../tabs";
import { ListPengabdian } from "../list-pengabdian";
import { ListPenelitianAdministrator } from "../list-penelitian-administrator";
import { ButtonAdd } from "@/components/button/button-add";
import { ContainerPage } from "@/components/container-page";
import { useQueryGetAllPenelitian } from "@/handlers/dosen/penelitian/query-get-all-penelitian";
import { useQueryGetAllPengabdian } from "@/handlers/dosen/pengabdian/query-get-all-pengabdian";
import { useStep } from "@/lib/hooks/useStep";
import { ListPengabdianAdministrator } from "../list-pengabdian-administrator";

export default function ProposalPageAdministrator() {
  const [tabActive] = useState("penelitian");
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);
  const [searchPenelitian, setSearchPenelitian] = useState("");
  const [searchPengabdian, setSearchPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { setCurrentStep } = useStep();

  const penelitian = {
    response: {
      code: 200,
      status: "OK",
    },
    error: false,
    data: {
      current_page: 1,
      data: [
        {
          id: "d2dd471f-3501-48af-9dd0-f285618e4226",
          jenis_penelitian_id: "484ba855-4664-4c7e-9433-79b7d5a3fe35",
          judul: "tes",
          rumpun_ilmu_id: "bc4057b5-60b0-44f9-a07f-cecf834f2aae",
          bidang_fokus: "fokus",
          tahun_usulan: "2023",
          jangka_waktu: "1 tahun",
          ringkasan: "ringkasan",
          file_proposal: {
            nama: "Kyle_G_redacted.pdf",
            path: "proposal/penelitian/proposal/k5JZXWVnD6DrUIMUJJI5odvfqKJxUDFV96DxRrv4.pdf",
            url: "https://sippm-backend.dev-unsia.id/storage/proposal/penelitian/proposal/k5JZXWVnD6DrUIMUJJI5odvfqKJxUDFV96DxRrv4.pdf",
          },
          file_pernyataan_mitra: null,
          file_cv: {
            nama: "Kyle_G_redacted.pdf",
            path: "proposal/penelitian/cv/pxggA50L5H7esVnyl0uz9NuBv7BZMkoHGKTlZu90.pdf",
            url: "https://sippm-backend.dev-unsia.id/storage/proposal/penelitian/cv/pxggA50L5H7esVnyl0uz9NuBv7BZMkoHGKTlZu90.pdf",
          },
          file_laporan_hasil: null,
          status: "Terkirim",
          status_lppm: "Diterima",
          status_reviewer: "Diterima",
          step: 6,
          user_id: "1435ce01-aef7-4b2c-b0cb-ccb5ff669c21",
          deleted_at: null,
          created_at: "2024-06-12 13:44:29",
          updated_at: "2024-06-13 09:27:34",
          jenis_penelitian: {
            id: "484ba855-4664-4c7e-9433-79b7d5a3fe35",
            nama: "Kerjasama",
            keterangan: null,
            created_at: "2024-03-14 11:54:10",
            updated_at: "2024-03-14 11:54:10",
          },
          rumpun_ilmu: {
            id: "bc4057b5-60b0-44f9-a07f-cecf834f2aae",
            nama: "AGAMA DAN FILSAFAT",
            keterangan: null,
            created_at: "2024-03-14 11:54:15",
            updated_at: "2024-03-14 11:54:15",
          },
          user: {
            id: "1435ce01-aef7-4b2c-b0cb-ccb5ff669c21",
            name: "dosen",
            username: "dosen",
            email: "dosen@gmail.com",
            email_verified_at: null,
            avatar:
              "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=dosen",
            biodata_id: null,
            biodata: null,
            roles: [
              {
                id: "1d082bfb-bd37-4786-91e5-461bb84fbe1f",
                name: "dosen",
                guard_name: "api",
                level: 2,
                description: "Dosen",
              },
            ],
          },
          dokumen_sk: null,
          dokumen_kontrak: null,
        },
      ],
      first_page_url:
        "https://sippm-backend.dev-unsia.id/api/proposals/dosens/penelitians?page=1",
      from: 1,
      last_page: 1,
      last_page_url:
        "https://sippm-backend.dev-unsia.id/api/proposals/dosens/penelitians?page=1",
      links: [
        {
          url: null,
          label: "&laquo; Sebelumnya",
          active: false,
        },
        {
          url: "https://sippm-backend.dev-unsia.id/api/proposals/dosens/penelitians?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "Berikutnya &raquo;",
          active: false,
        },
      ],
      next_page_url: null,
      path: "https://sippm-backend.dev-unsia.id/api/proposals/dosens/penelitians",
      per_page: 10,
      prev_page_url: null,
      to: 1,
      total: 1,
    },
  };

  // const handlePageChangePenelitian = (event) => {
  //   setPagePenelitian(event.selected + 1);
  // };
  // const handlePageChangePengabdian = (event) => {
  //   setPagePengabdian(event.selected + 1);
  // };

  const debounced = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
    setPagePenelitian(1);
  }, 1000);

  const debouncedSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
    setPagePengabdian(1);
  }, 1000);

  // const { data: penelitian, isLoading: isLoadingPenelitian } =
  //   useQueryGetAllPenelitian(searchPenelitian, pagePenelitian);
  // const { data: pengabdian, isLoading: isLoadingPengabdian } =
  //   useQueryGetAllPengabdian(searchPengabdian, pagePengabdian);

  // const pengabdianDraft = pengabdian?.data.filter(
  //   (proposal) => proposal.status === "Draft",
  // );
  // const penelitianDraft = penelitian?.data.filter(
  //   (proposal) => proposal.status === "Draft",
  // );

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/search-black.svg"
          title={`Proposal - ${capitalFirtsLatter(currentTab || tabActive)}`}
        />
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-start lg:gap-4">
            <Tabs
              tabActive={currentTab || tabActive}
              // penelitianDraft={penelitianDraft}
              // pengabdianDraft={pengabdianDraft}
            />
          </div>
          <SearchInput
            onChange={(e) => {
              currentTab === "pengabdian"
                ? debouncedSearchPengabdian(e.target.value)
                : debounced(e.target.value);
            }}
            defaultValue={
              currentTab === "pengabdian" ? searchPengabdian : searchPenelitian
            }
          />
          {/* <Link href={`/proposal/${currentTab || tabActive}/tambah`}>
            <ButtonAdd
              disabled={
                penelitian?.data?.find((item) => item.status === "Draft") ||
                pengabdian?.data?.find((item) => item.status === "Draft")
              }
              onClick={() => {
                localStorage.setItem("step", 1);
                localStorage.setItem("isEdit", false);
                localStorage.removeItem("penelitianId");
                localStorage.removeItem("pengabdianId");
                setCurrentStep(1);
              }}
              className="w-full justify-center lg:w-fit"
            />
          </Link> */}
        </div>
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitianAdministrator
            penelitian={penelitian}
            // currentTab={currentTab}
            // tabActive={tabActive}
            // isLoading={isLoadingPenelitian}
            // handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          // <></>
          <ListPengabdianAdministrator
            pengabdian={penelitian}
            // currentTab={currentTab}
            // tabActive={tabActive}
            // isLoading={isLoadingPengabdian}
            // handlePageChange={handlePageChangePengabdian}
          />
          // <></>
        )}
      </div>
    </ContainerPage>
  );
}
