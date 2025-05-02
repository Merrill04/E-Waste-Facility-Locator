function Card() {
    return (
      <div className="flex items-center sm:flex-col md:flex-col flex-col lg:flex-row">
        <img src="https://tse3.mm.bing.net/th?id=OIP.E69NAURXK9hNqrdI5PwlFAHaFW&pid=15.1" alt="" />
  
        <div className="flex p-3 gap-4 flex-col mx-9">
          <h2 className="text-2xl font-bold">Unlock Rewards for Responsible Disposal</h2>
          <p>
            We believe in recognizing and incentivizing responsible e-waste disposal. Our rewards
            program offers exciting benefits to encourage users to participate in our mission. Earn
            points for each proper disposal and unlock exclusive perks.
          </p>
          <a
            className="btn text-white p-3 bg-blue-600 hover:bg-blue-700 w-min rounded-md"
            href="/Recycle">
            Dispose
          </a>
        </div>
      </div>
    );
  }
  
  export default Card;
  