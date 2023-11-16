export default function SideMeuItem(props){
    return(
        <>  
            <div className="space-x-2 space-y-2
              py-1 px-1 
              items-center gap-3
              text-[#FFF]
              overflow-auto 
              rounded-md hover:bg-[#D40000]
              hover:text-white
              hover:font-medium
              transition-colors duration-200 
              cursor-pointer 
              text-base 
              font-normal
              mb-1
              flex-shrink-0">
            <a 
              onClick={props.onClick}
            >
              {props.name}
            </a>
            </div>
           </>
    );
}