// src/components/Table.jsx
import Loading from "./Loading";

export default function Table({ items, columns, loading, error }) {
  if (loading) return <Loading />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-lg border border-gray-200">
      <table className="min-w-[700px] w-full text-sm md:text-base text-left bg-white text-gray-700 rounded-xl overflow-hidden">
        
        {/* Header */}
        <thead className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-sm">
          <tr>
            {columns.map((c,) => (
              <th
                key={c.key}
                className="px-3 py-4 md:px-6 md:py-4 font-semibold text-xs md:text-sm tracking-wide text-center whitespace-nowrap"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 md:px-6 py-12 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            items.map((row, i) => (
              <tr
                key={row.id || i}
                data-aos="fade-right"
                data-aos-delay={i * 300} 
                className={`text-center transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-orange-50"
                } hover:bg-orange-100`}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-3 py-3 md:px-6 md:py-4 ${
                      c.nowrap
                        ? "whitespace-nowrap"
                        : "max-w-[250px] truncate break-words"
                    }`}
                  >
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
