import React from "react";

export function ProductProperties({ properties, description }) {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="text-start basis-6/12">
          <h3 className="font-bold my-2 text-center">Description</h3>
          <div className="space-y-6 pl-3">
            <p className="text-base text-gray-900">{description}</p>
          </div>
        </div>
        <div className="basis-5/12">
          <div className="mt-4 text-start">
            <table class="table-auto w-full">
              <tbody className="divide-y-2 divide-dotted">
                {properties.map((property) => (
                  <tr className="hover:">
                    <td className="font-bold py-2">{property.title}</td>
                    <td className="">{property.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
