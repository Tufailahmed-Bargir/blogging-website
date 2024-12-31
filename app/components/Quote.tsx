export default function Quote() {
    return (
      <div className="hidden lg:flex flex-1 bg-[#F5F8FF] items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="max-w-md">
          <blockquote>
            <p className="text-2xl lg:text-3xl font-black mb-6 leading-tight">
              The customer service I received was exceptional. The support team went above and beyond to address my concerns.
            </p>
            <footer>
              <p className="text-lg lg:text-xl font-bold">Jules Winfield</p>
              <p className="text-gray-600">CEO | Acme</p>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }