import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage, roomClassifications } from "@/lib/content";

const principles = [
  "تصنيف تسويقي يعزز وضوح الفئات على منصات الحجز",
  "فصل أكبر بين الفئات لإبراز الإطلالة والتجهيزات والقيمة",
  "تعدد سعري يدعم ترقية الضيف إلى فئات أعلى",
  "مراجعة التصنيف بعد 6 أشهر بناء على الأداء والطلب",
];

export default function RoomsSuitesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الغرف والأجنحة"
        title="تصنيف الوحدات حسب كل منشأة."
        text="تعرض هذه الصفحة التصنيف التسويقي المعتمد للغرف والأجنحة والشقق في كل منشأة، مع عدد الوحدات وأرقام الغرف والفروقات الأساسية بين الفئات."
        image={heroImage}
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">منهجية التصنيف</span>
          <h2>تصنيف تسويقي لتحسين البيع والظهور.</h2>
          <p>
            يعتمد التصنيف على إظهار الفروق بين الفئات، مثل الإطلالة، عدد غرف
            النوم، تكوين الأسرّة، وغرف المعيشة، بما يساعد الضيف على اختيار
            الوحدة الأنسب ويساعد المنشآت على إدارة الأسعار بشكل أوضح.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((item) => (
            <div className="content-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">تفاصيل الوحدات</span>
          <h2>الفئات المعتمدة لكل منشأة.</h2>
          <p>
            كل جدول يوضح اسم الفئة، عدد غرف النوم، تكوين الأسرّة، الإطلالة،
            دورات المياه، غرف المعيشة، إجمالي الوحدات، وأرقام الغرف.
          </p>
        </div>

        <div className="mt-8 grid gap-8">
          {roomClassifications.map((property) => (
            <section className="unit-table-card" key={property.property}>
              <div className="unit-table-header">
                <div>
                  <span className="eyebrow">تصنيف الوحدات</span>
                  <h3>{property.property}</h3>
                </div>
                <strong>{property.total}</strong>
              </div>

              <div className="unit-table-scroll">
                <table className="unit-table">
                  <thead>
                    <tr>
                      <th>الفئة</th>
                      <th>غرف النوم</th>
                      <th>الأسرّة</th>
                      <th>الإطلالة</th>
                      <th>دورات المياه</th>
                      <th>غرف المعيشة</th>
                      <th>عدد الوحدات</th>
                      <th>أرقام الغرف</th>
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

      <CtaBand title="قارن الفئات واحجز الوحدة الأنسب." cta="احجز وحدتك" />
    </PageShell>
  );
}
