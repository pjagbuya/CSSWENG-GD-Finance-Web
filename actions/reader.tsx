import { createWorker } from 'tesseract.js';

function extract_php_amount(text: any) {
  let match = text.match(/PHP\s*\d+.\d*/);
  if (match) {
    return match[0];
  } else {
    match = text.match(/P\s*\d+.\d*/);
    let match2 = text.match(/Amount\s*\d+.\d*/);
    if (match) {
      return match[0];
    } else if (match2) {
      return match2[0];
    }
    return '0.00';
  }
}

function extract_ref_no(text: any) {
  let pattern = /(Ref|Rof)\s*No\. (\d+\s*\d+\s*\d+)/g;
  let match = text.match(pattern);
  let match2 = text.match(/(Ref|Rof).\s*No\. (\d+\s*\d+\s*\d+)/g);
  let match3 = text.match(/\n(\d+\s*\d+\s*\d+)/);
  let match4 = text.match(/(Ref|Rof)\s*No\, (\d+)/g);
  let match5 = text.match(/(Ref|Rof).\s*No\, (\d+)/g);
  let match6 = text.match(/jo. (\d+\s*\d+\s*\d+)/);
  let match7 = text.match(/Ref No\.\s*(?:(S|$))?\s*(\d+)\s+(\d+)\s+(\d+)/);
  let match8 = text.match(/Rot No\.\s*(?:\$)?\s*(\d+)\s+(\d+)\s+(\d+)/);
  if (match) {
    return match[0].split(' ')[2];
  } else if (match2) {
    return match2[0].split(' ')[2];
  } else if (match3) {
    return match3[0].replace('\n', '');
  } else if (match4) {
    return match4[0].split(' ')[2];
  } else if (match5) {
    return match5[0].split(' ')[2];
  } else if (match6) {
    return match6[0].replace('jo.', '');
  } else if (match7) {
    let case_with_5 = match7[0].replace('S', '5');
    let final = case_with_5.match(/(\d+\s*\d+\s*\d+)/);
    return final[0];
  } else if (match8) {
    return match8[0];
  } else {
    return '#';
  }
}

function extract_amount(text: any) {
  let match = text.match(/\d+\.\d{0,2}/);
  if (match) {
    return parseFloat(match[0]).toFixed(2);
  } else {
    return null;
  }
}

function extract_dates(text: any) {
  let pattern = /\w+\s+\d{1,2},\s+\d{4}|\d{2}-\d{2}-\d{4}/g;
  let matches = text.match(pattern);
  return matches ? matches[0] : '#';
}

export async function getDataFromReceiptImg(img: File) {
  const worker = await createWorker('eng');
  const ret = await worker.recognize(img);
  const text = ret.data.text;
  await worker.terminate();

  const php_cost = extract_php_amount(text);

  return {
    amount: extract_amount(php_cost),
    payment_details: extract_ref_no(text),
    date: extract_dates(text),
  };
}
