const HistoryTable = ({ data }) => {
  return (
    <table>
      {data.map((row, index) => (
        <tr key={index}>
          {row.map((cell) =>
            index === 0 ? (
              <th
                key={index}
                style={{
                  border: "1px solid darkgray",
                  padding: "10px",
                }}
              >
                {cell}
              </th>
            ) : (
              <td
                key={index}
                style={{
                  border: "1px solid darkgray",
                  padding: "10px",
                }}
              >
                {cell}
              </td>
            )
          )}
        </tr>
      ))}
    </table>
  );
};
export default HistoryTable;
