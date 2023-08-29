import React from 'react';
import RecursiveAccordion from './Accordion';

const App = () => {
  const accordionSections = [
    {
      title: 'Section 1',
      open: true,
      content: (
        <div>
          <p>This is the content of Section 1.</p>
        </div>
      ),
    },
    {
      title: 'Section 2',
      open: false,
      content: (
        <div>
          <p>This is the content of Section 2.</p>
          <RecursiveAccordion
            allowMultipleOpen={false}
            sections={[
              {
                title: 'Subsection 1',
                open: true,
                content: (
                  <div>
                    <p>This is the content of Subsection 1.</p>
                  </div>
                ),
              },
              {
                title: 'Subsection 2',
                open: false,
                content: (
                  <div>
                    <p>This is the content of Subsection 2.</p>
                  </div>
                ),
              },
            ]}
            
          />
        </div>
      ),
    },
  ];
  

  return (
    <div className="App">
      <h1>Accordion Example with Multiple Open Sections</h1>
      <RecursiveAccordion sections={accordionSections} allowMultipleOpen={false}/>

    </div>
  );
};

export default App;
