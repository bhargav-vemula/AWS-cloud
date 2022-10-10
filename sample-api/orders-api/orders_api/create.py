import boto3,json,os
   
dynamodb = boto3.resource('dynamodb')
def lambda_handler(event, context):
    order = json.loads(event['body']) 
    table_name = os.environ.get('ORDERS_TABLE')    
    table = dynamodb.Table(table_name)
    response = table.put_item(TableName = table_name, Item = order)
    print(response)
    return {
        "statusCode": 201,
        'headers': {"Access-Control-Allow-Headers" : 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'},
        "body": json.dumps({
            "message": "Order Created"})
    }
