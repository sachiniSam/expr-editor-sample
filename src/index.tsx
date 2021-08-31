import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ExpressionType {
    kind: string,
    parent ?: ExpressionType,
    template: string[]
    supportedExprs: ExpressionType[]
}

const comparisonExpr : ExpressionType = {
    kind: "comparisonExpression",
    template: ["expression","operator","expression"],
    supportedExprs: []
}

const logicalExpr : ExpressionType = {
    kind: "logicalExpression",
    template: ["expression","operator","expression"],
    supportedExprs: [comparisonExpr]
}

const ifElseExprType : ExpressionType = {
    kind: "ifElseExpression",
    template: ["expression"],
    supportedExprs: [comparisonExpr,logicalExpr]
}

function TreeEditor (props:{exprItem: ExpressionType, onClick:(tree:ExpressionType) => void} ){
    const {exprItem, onClick} =props;
    return (
        <ul>
            <h5>expression list </h5>
            {console.log(exprItem.kind)}
            { exprItem.supportedExprs.map(expression => (       
                 <button className="button1 App-expression-component" onClick = {() => onClick(expression)}>{expression.kind}</button>
            ))}
            
        </ul>
    );
}


function App() {
    const [selectedExpressionType, setSelectedExpressionType] = React.useState(ifElseExprType)
    return (
 
        <div className="App">
            <header className="App-header">Expression Suggestions</header>
            <TreeEditor exprItem={selectedExpressionType} onClick = {setSelectedExpressionType} />
        </div>
 
    );
 
 }

 ReactDOM.render(
  <App />,
  document.getElementById('root')
);