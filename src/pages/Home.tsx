import React from 'react';
import Hero from '../components/Hero';
import RequestForm from '../components/RequestForm';
import SupplierMatches from '../components/SupplierMatches';
import { type RealSupplier } from '../data/realSuppliers';

interface HomeProps {
  onAddToShortlist: (supplier: RealSupplier) => void;
  shortlistedIds: string[];
  onShowAuth: () => void;
}

export default function Home({ onAddToShortlist, shortlistedIds, onShowAuth }: HomeProps) {
  const [currentStep, setCurrentStep] = React.useState<'hero' | 'form' | 'results'>('hero');
  const [searchData, setSearchData] = React.useState<any>(null);

  const handleSearchSubmit = (query: string) => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: any) => {
    setSearchData(data);
    setCurrentStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSearch = (newData: any) => {
    setSearchData(newData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {currentStep === 'hero' && (
        <Hero onSearchSubmit={handleSearchSubmit} />
      )}

      {currentStep === 'form' && (
        <RequestForm onSubmit={handleFormSubmit} />
      )}

      {currentStep === 'results' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SupplierMatches
            onAddToShortlist={onAddToShortlist}
            shortlistedIds={shortlistedIds}
            searchMode={searchData?.searchMode}
            searchData={searchData}
            onUpdateSearch={handleUpdateSearch}
            onShowAuth={onShowAuth}
          />
        </div>
      )}
    </>
  );
}