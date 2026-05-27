import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage, roomClassificationsEn } from "@/lib/content-en";

const principlesEn = [
  "A marketing classification that improves category clarity on booking platforms",
  "Stronger separation between categories by view, layout, bedding, and value",
  "Clearer price diversity that supports upgrades to higher categories",
  "A classification to be reviewed after 6 months based on performance and demand",
];

export default function RoomsSuitesPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Rooms and suites"
        title="Unit classification by property."
        text="This page presents the approved marketing classification for rooms, suites, and apartments in each property, including unit counts, room numbers, views, bedding, bathrooms, and living rooms."
        image={heroImage}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">Classification method</span>
          <h2>A marketing classification for better sales and visibility.</h2>
          <p>
            The classification highlights meaningful differences between
            categories, including view, bedroom count, bed configuration, and
            living rooms, helping guests choose the right unit and helping
            properties manage pricing more clearly.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {principlesEn.map((item, index) => (
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
          <span className="eyebrow">Unit details</span>
          <h2>Approved categories for each property.</h2>
          <p>
            Each table shows category name, bedrooms, bed configuration, view,
            bathrooms, living rooms, total units, and room numbers.
          </p>
        </div>

        <div className="mt-8 grid gap-8">
          {roomClassificationsEn.map((property, index) => (
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
