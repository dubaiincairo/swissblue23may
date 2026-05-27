import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function RoomsSuitesPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.roomsSuites;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{content.intro.eyebrow}</span>
          <h2>{content.intro.title}</h2>
          <p>{content.intro.text}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.principles.map((item, index) => (
            <div
              className="content-card reveal-slide-up"
              key={item}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{content.detailsIntro.eyebrow}</span>
          <h2>{content.detailsIntro.title}</h2>
          <p>{content.detailsIntro.text}</p>
        </div>

        <div className="mt-8 grid gap-8">
          {content.classifications.map((property, index) => (
            <section
              className="unit-table-card reveal-slide-up"
              key={property.property}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="unit-table-header">
                <div>
                  <span className="eyebrow">Unit classification</span>
                  <h3>{property.property}</h3>
                </div>
                <strong>{property.total}</strong>
              </div>

              <div className="unit-table-scroll">
                <table className="unit-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Bedrooms</th>
                      <th>Beds</th>
                      <th>View</th>
                      <th>Bathrooms</th>
                      <th>Living rooms</th>
                      <th>Total units</th>
                      <th>Room numbers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.rows.map((row) => (
                      <tr key={`${property.property}-${row.type}-${row.rooms}`}>
                        <td>
                          <strong>{row.type}</strong>
                        </td>
                        <td>{row.bedrooms}</td>
                        <td>{row.bedConfig}</td>
                        <td>{row.view}</td>
                        <td>{row.bathrooms}</td>
                        <td>{row.livingRooms}</td>
                        <td>{row.totalUnits}</td>
                        <td className="room-numbers">{row.rooms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </section>

      <CtaBandEn title="Compare categories and book the right unit." cta="Book your unit" />
    </PageShellEn>
  );
}
