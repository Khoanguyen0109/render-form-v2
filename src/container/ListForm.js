import React, { useEffect, useState } from 'react';
import FormCard from '../components/FormCard';
import axios from 'axios';
import SkeletonCard from '../components/SkeletonCard';
function ListForm(props) {
  const { list, loading } = props;

  return (
    <>
      <div className='container mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8'>
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}

        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          list.map((item) => (
            <FormCard formId={item.idform} name={item.name_form} />
          ))
        )}
      </div>
    </>
  );
}

export default ListForm;
