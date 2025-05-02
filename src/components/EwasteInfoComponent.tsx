// components/EwasteInfoComponent.js
const EwasteInfoComponent = () => {
    return (
      <div className="bg-gray-100 p-8 rounded-md shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Types of Unrecyclable E-waste</h2>
  
        <ul className="list-disc pl-6">
          <li className="mb-4">
            <strong>Lithium-containing e-waste:</strong> This includes batteries.
          </li>
          <li className="mb-4">
            <strong>Appliances containing freon:</strong> This includes refrigerators, dehumidifiers, and air conditioners.
          </li>
          <li className="mb-4">
            <strong>Electronics containing mercury or lead:</strong> This includes LCD televisions and monitors, and old TVs (pre-1991). Old cathode ray tube televisions also contain lead.
          </li>
          <li className="mb-4">
            <strong>Damaged LCD screens:</strong> If the mercury lamp is separated from the screen, it must be disposed of properly.
          </li>
          <li className="mb-4">
            <strong>Non-decontaminated medical equipment:</strong> Recycling centers often don’t accept microwave ovens, even though these appliances have a ton of worthy spare parts.
          </li>
        </ul>
  
        <p className="mt-6">
          <strong className="block mb-2">Adverse Impacts on Human Health:</strong>
          E-waste recycling activities may have several adverse impacts on human health. Children and pregnant women are particularly vulnerable.
        </p>
      </div>
    );
  };
  
  export default EwasteInfoComponent;
  