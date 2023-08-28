import React, { useState } from 'react';
import './Accordion.css';

const RecursiveAccordion = ({ sections, allowMultipleOpen }) => {
  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (index) => {
    if (allowMultipleOpen) {
      if (activeSections.includes(index)) {
        setActiveSections(activeSections.filter((activeIndex) => activeIndex !== index));
      } else {
        setActiveSections([...activeSections, index]);
      }
    } else {
      setActiveSections([index]);
    }
  };

  return (
    <div className="accordion">
      {sections.map((section, index) => (
        <div key={index} className="accordion-section">
          <div
            className={`accordion-header ${activeSections.includes(index) ? 'active' : ''}`}
            onClick={() => toggleSection(index)}
          >
            {section.title}
          </div>
          <div className={`accordion-content ${activeSections.includes(index) ? 'open' : ''}`}>
            {section.content}
            {section.sections && (
              <RecursiveAccordion sections={section.sections} allowMultipleOpen={allowMultipleOpen} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecursiveAccordion;
