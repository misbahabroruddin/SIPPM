import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { SectionHeaderDetailPenilaianProposal } from "@/components/proposal/detail/section-header-detail-penilaian-proposal";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";

export default function PenilaianPage() {
  const data = {};
  return (
    <ContainerPage>
      <div className="flex flex-col gap-2 lg:gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Penelitian" />
        <SectionHeaderDetailProposal />
        <table className="overflow-hidden rounded-lg">
          <thead className="bg-primary text-sm font-normal text-white">
            <tr>
              <th className="w-28 py-3">No</th>
              <th>Penilaian</th>
              <th className="w-32">Bobot(%)</th>
              <th className="w-40">Skor</th>
              <th className="w-40">Nilai</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td>
                <div className="flex flex-col py-2">
                  <p>PENDAHULUAN</p>
                  <div className="flex flex-col gap-1 text-sm">
                    <p>a. Ketajaman Perumusan Masalah</p>
                    <p>a. Ketajaman Perumusan Masalah</p>
                    <p>a. Ketajaman Perumusan Masalah</p>
                  </div>
                </div>
              </td>
              <td className="text-center">25</td>
              <td className="">
                <div className="flex justify-center">
                  <input
                    type="text"
                    className="mx-auto w-28 rounded-lg border px-2 py-1 "
                    placeholder="Skor"
                  />
                </div>
              </td>
              <td className="mx-auto">
                <div className="flex justify-center">
                  <input
                    type="text"
                    className="mx-auto w-28 cursor-default rounded-lg border px-2 py-1 focus:outline-none focus:ring-0"
                    placeholder="Nilai"
                    readOnly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="bg-blue-09">
                <div className="text-black-06 px-6 py-4">
                  <p>Catatan Penelaah/Reviewer :</p>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid dolor quibusdam doloremque atque voluptas ipsum
                    rerum quae porro ea voluptatum veritatis aperiam cumque id,
                    soluta aliquam libero corporis architecto obcaecati tenetur
                    reprehenderit labore, facilis necessitatibus? Minima, nemo?
                    Beatae velit deleniti eveniet ullam cumque earum expedita
                    necessitatibus rem qui quaerat, enim, sapiente asperiores
                    corporis nobis consequatur in? Facilis reiciendis ab, nobis
                    expedita atque assumenda recusandae eligendi! Incidunt atque
                    quae quod? Explicabo at blanditiis quaerat quo enim fugiat
                    velit, voluptate nisi exercitationem cumque repudiandae
                    eligendi optio libero fugit illo voluptatibus quasi eius,
                    nesciunt nihil earum aperiam laudantium sunt impedit
                    laboriosam. Laborum, quis!
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ContainerPage>
  );
}
