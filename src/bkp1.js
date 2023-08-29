import React, { useState, useEffect } from 'react';
import './Accordion.css';

const RecursiveAccordion = ({ sections, allowMultipleOpen }) => {
  // Armazena os índices das seções ativas
  const [activeSections, setActiveSections] = useState([]);

  // Configura as seções ativas inicialmente com base nas propriedades "open" dos filhos
  useEffect(() => {
    const initiallyOpenSections = sections
      .map((section, index) => (section.open ? index : null))
      .filter((index) => index !== null);

    setActiveSections(initiallyOpenSections);
  }, [sections]);

  // Função para alternar a abertura/fechamento de uma seção
  const toggleSection = (e, index) => {
    const isCurrentlyOpen = activeSections.includes(index);
    const isTargetOpen = e.target.classList.contains('open');

    if (!allowMultipleOpen) {
      // Se o "allowMultipleOpen" for falso, alterna entre abrir e fechar uma seção
      const newActiveSections = isCurrentlyOpen ? [] : [index];
      setActiveSections(newActiveSections);
    } else if (!isTargetOpen) {
      // Se "allowMultipleOpen" for verdadeiro e a seção não estiver aberta, a abre
      setActiveSections((prevActiveSections) => [...prevActiveSections, index]);
    }

    // Altera a altura da seção para animar a abertura/fechamento
    if (isOpen(index)) {
      e.target.nextSibling.style.height = e.target.nextSibling.scrollHeight + 'px';
    } else {
      e.target.nextSibling.style.height = '0px';
    }
  };

  const setHeightContent = (e, index) => {
    if(isOpen(index)){
      e.target.nextSibling.style.height = e.target.nextSibling.scrollHeight + 'px';
      setTimeout(() => {
        e.target.nextSibling.style.height = '0px';
      }, 100)
    }
  }

  // Verifica se uma seção está aberta
  const isOpen = (index) => {
    return activeSections.includes(index);
  };

  return (
    <div className="accordion">
      {sections.map((section, index) => (
        <div key={index} className="accordion-section">
          <div
            className={`accordion-header ${isOpen(index) ? 'active' : ''}`}
            onClick={(e) => toggleSection(e, index)}
          >
            {section.title}
          </div>
          <div
            className={`accordion-content ${isOpen(index) ? 'open' : ''}`}
            style={{
              // height: setHeightContent(index)
            }}
            onTransitionEnd={(e) => {
              // Remove a altura quando a transição de fechamento terminar
              if (isOpen(index)) {
                e.target.style.height = 'auto';
              }
            }}
          >
            {section.content}
            {section.sections && (
              <RecursiveAccordion
                sections={section.sections}
                allowMultipleOpen={allowMultipleOpen}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecursiveAccordion;
