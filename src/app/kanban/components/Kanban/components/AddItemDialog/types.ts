export type FieldsKey = {title:string, required:boolean, dropdown?:string[]};
  
export type Fields = {
  Title: FieldsKey,
  Status: FieldsKey,
  Summary: FieldsKey,
  Type: FieldsKey,
  Priority: FieldsKey,
  Tags: FieldsKey,
  Assignee: FieldsKey,
}

export type FieldsKeys = 'Title' | 'Status' | 'Summary' | 'Type' | 'Priority' | 'Tags' | 'Assignee' ;

export type Styles = {
  visible: {
    wrapper: 'dark:bg-gray-800 bg-white absolute rounded-lg flex justify-center items-center max-xl:top-[10%] max-xl:bottom-[10%] max-sm:top-[20%] max-sm:bottom-[20%] top-[5%] bottom-[5%] max-xl:left-[5%] max-xl:right-[5%] left-[25%] right-[25%] z-50 opacity-100',
    external: 'dark:bg-gray-700 bg-g`ray-200 flex flex-col gap-3 items-center justify-center rounded-lg w-[80%] self-center h-[90%] opacity-100',
  },
  transition: 'ease-in-out duration-500'
};