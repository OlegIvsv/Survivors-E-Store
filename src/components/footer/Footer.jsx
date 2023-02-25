const references = [
  { reference: "#", title: "About" },
  { reference: "#", title: "Privacy Policy" },
  { reference: "#", title: "Licensing" },
  { reference: "#", title: "Social Media" },
];

export function Footer() {
  return (
    <footer className="footer footer-center px-10 py-2 bg-x-dark-green text-x-white">
      <hr />
    <div className="grid grid-flow-col gap-12 font-bold">
      {
        references.map((ref, index) => (
          <a href={ref.reference} className="link link-hover">{ref.title}</a> 
        ))
      }
    </div> 
    <div>
      <div className="grid grid-flow-col gap-5 text-xl">
          <i class="bi bi-google"></i>
          <i class="bi bi-twitter"></i>
          <i class="bi bi-facebook"></i>  
      </div>
    </div> 
    <div>
      <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
    </div>
  </footer>    
  );
}
