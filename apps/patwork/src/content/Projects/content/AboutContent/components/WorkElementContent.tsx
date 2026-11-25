import { AnimateLine } from '@/animations'
import { HorizontalLines } from '@/ui'
import { ArrowDown, ArrowRight, ArrowRightIcon } from 'lucide-react'
import React from 'react'

const WorkElementContent = ({number}:{number: string}) => {
  
  if (number === "01") {
    return (
        <div>
            <h5>
               Ideen. <br />
               Struktur. <br />
               Ziele. 
            </h5>
            <p>
                Wir blicken auf die individuellen Anforderungen eines Projektes und ermittlen die Schnittmenge aus den Bestehendem und Neuem.
                <br />
            </p>
            <ul>
                <li>
                    Projekt-Ziele
                </li>
                <li>
                    Kundenvorstellungen
                </li>
                <li>
                    Bestehende Inhalte
                </li>
                <li>
                    Visuelle Gestaltung
                </li>
            </ul>
            <p>

            </p>
            <p>
                Ziel ist nicht nur die erstellen eines visuellen Designs, sondern ein digitales Ökosystems, das die digitalen Strategie des Kunden unterstützt und ergänzt.            
            </p>
        </div>
    ) }


    if (number === "02") {
        return (
            <div>
                <h5>
                    Entwickeln.<br />
                    Testen.<br />
                    Iterieren.
                </h5>
                <p>
                    Um erfolgreich und langlebig zu sein, muss ein digitales Produkt ansprechend, funktional robust und flexibel sein. <br />
                    Im Kern jedes Entwicklungsprozesses steht dabei nicht nur die Projekt im Verhältnis nach außen, sondern auch die internen Prozesse und Strukturen. 
                    Da die Eigenständigkeit des Kunden ein wesentliches Ziel meinser Arbeit darstellt, findet die Entwicklung in enger Zusammenarbeit statt. 
                </p>
               
                <p className="large">
                    Jeder Schritt in diesem Prozess ist essentiell, um die Ideen und Abläufe des Kunden ihren Weg in die fertige Anwendung finden.
                </p>
            </div>
        )
    }

    if (number === "03") {
        return (
            <div>
                <p>
                    Sowohl vor als auch nach der Umsetzung ist die Kommunikation mit dem Kunden essentiell, damit das Projekt mit den Veränderungen der Anforderungen des Kunden mit wachsen kann.
                <br />
            </p>
            </div>
        )
    }
  return null
}

export default WorkElementContent