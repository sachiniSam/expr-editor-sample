import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ExpressionType {
    kind: string,
    parent ?: ExpressionType,
    template: string[]
    supportedExprs: ExpressionType[]
}

const conditionalExpr : ExpressionType = {
    kind: "ConditionalExpression",
    template: ["expression", "?", "expression",":", "expression"], // conditional expr has two templates
    supportedExprs: [] // suggestions, in Ui we show the vars and functions
}
// enum ComparisonOperatorTypes {
//     GREATER_THAN = ">",
//     LESS_THAN = "<",
//     EQUALITY = "==",
//     NOT_EQUAL = "!=",
//   }
// const comparisonOperators = {
//     operators : [">","<",]
// }

const comparisonExpr : ExpressionType = {
    kind: "comparisonExpression",
    template: ["expression","operator","expression"], // how can we manage the operators
    supportedExprs: [conditionalExpr]
}

const logicalExpr : ExpressionType = {
    kind: "logicalExpression",
    template: ["expression","operator","expression"],
    supportedExprs: [comparisonExpr],
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
            <h5>{exprItem.template.map(templateItem => (
                <button className="btnTemplate">{templateItem}</button>
            ))}</h5>
            <h5>expression list: Parent : {exprItem.kind} </h5>
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
            <header className="App-header">Expression Editor base</header>
            <TreeEditor exprItem={selectedExpressionType} onClick = {setSelectedExpressionType} />
        </div>
 
    );
 
 }

 ReactDOM.render(
  <App />,
  document.getElementById('root')
);