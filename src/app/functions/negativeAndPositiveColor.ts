export default function negativeAndPositiveColor({num, model, negativeColor, positiveColor}:NegativeAndPositiveColorParamsType):string {
  if (!/\${num}/g.test(model)) throw 'o parametro model deve conter ${num}, que indica onde esta o número do parametro num';
  const notNumber = model.split('${num}');
  const number = Number(num.replace(notNumber[0], '').replace(notNumber[1], ''));
  if (number <= 0) return negativeColor ?? 'rgba(250,40,40,.8)';
  return positiveColor ?? 'rgba(40,250,40,.8)';
}


export type NegativeAndPositiveColorParamsType = {num:string, model:string, negativeColor?:string, positiveColor?:string};
export type NegativeAndPositiveColorType = ({num, model}:{num:number, model:string}) => string;