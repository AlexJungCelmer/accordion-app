import React, { useState } from 'react';
import './Accordion.css';

const RecursiveAccordion = ({ sections, allowMultipleOpen }) => {
  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (e, index) => {


    e.target.classList.toggle('active-accordion')
    if (e.target.classList.contains('active-accordion')) {
      e.target.nextSibling.style.height = e.target.nextSibling.scrollHeight + 'px'
    } else {
      e.target.classList.remove('active-accordion')
      e.target.nextSibling.style.height = e.target.nextSibling.scrollHeight + 'px'
      e.target.nextSibling.style.height = '0px'
    }
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
            onClick={(e) => toggleSection(e, index)}
          >
            {section.title}
          </div>
          <div
            className={`accordion-content`}
            onTransitionEnd={e => {
              e.persist();
              if (e.target.classList.contains('active-accordion')) {
                e.target.style.height = 'auto'
              }
            }}
            style={{
              // height: activeSections.includes(index) ? 'auto' : '0',
              opacity: activeSections.includes(index) ? 1 : 0,
              // transition: 'opacity 0.3s ease-in-out',
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
