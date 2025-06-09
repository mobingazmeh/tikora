import Image from "next/image";

interface CategoryItem {
    id: number;
    title: string;
    cover: string | null;  // تغییر از string به string | null
  }
  
  interface CategoryProps {
    data: CategoryItem[];
    title: string | null;
  }
  
  export default function Category({ data, title }: CategoryProps) {
    return (
      <div className="relative rounded-xl pb-6  bg-white">
        {title && (
          <div className="w-full flex px-4 justify-between items-center h-0">
            <h2 className="flex items-center w-fit gap-2 text-md">{title}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3   ">
          {data.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-1  hover:border-secondary-500 transition-colors">
              <div className="aspect-square relative cursor-pointer h-32 w-full">
                <Image
                  src={category.cover||""}
                  alt={category.title}
                  fill
                  className="w-full h-32"
                 // onError={e => e.currentTarget.classList.add('!hidden')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }