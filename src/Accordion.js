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
          <div
            className={`accordion-content ${activeSections.includes(index) ? 'open' : ''}`}
            style={{
              maxHeight: activeSections.includes(index) ? '1000px' : '0',
              opacity: activeSections.includes(index) ? 1 : 0,
              transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
            }}
          >
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
