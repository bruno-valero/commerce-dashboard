import { CheckDomainProps } from './types';

export default function checkDomain({domain, data}:CheckDomainProps) {
  const registeredDomains = data.registeredDomains ?? [];
  if (typeof data['Image'] === 'string') {
    domain.isDomain = true;
    console.log('image on checkDomain', data['Image'], data.Name, data.Id, registeredDomains);
    
    const currentDomain:string = (data['Image'] as string).split('//')?.[1]?.split('/')?.[0] ?? '';
    if (registeredDomains.includes(currentDomain)){
      domain.valid = true;
    } else { domain.valid = false; };   

  } else { domain.isDomain = false; };
};